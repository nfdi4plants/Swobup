import obonet
import networkx
import datetime
import sys
import pandas as pd
from io import StringIO

import time
import os

from tasks import app
from app.github.webhook_payload import PushWebhookPayload
from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser

from celery.result import AsyncResult

from app.helpers.notifications.email.mail_notifier import MailNotifier

from app.helpers.notifications.models.notification_model import Notifications, Message
from app.helpers.notifications.models.colors import Colors, Warning, Success

from app.helpers.notifications.models.colors import Colors
from app.helpers.notifications.email.models.images import Images

from app.neo4j.neo4jConnection import Neo4jConnection

from app.helpers.s3_storage import S3Storage

from celery.backends.s3 import S3Backend
import json


@app.task
# def show_tasks_results(task_ids: list, task_results: list):
def show_tasks_results(task_ids: list):
    status: list = []

    while len(task_ids) >= 1:
        print("in loop")
        for task_id in task_ids:
            res = AsyncResult(task_id, app=app)
            print("status: ", res.state)
            if res.state == "SUCCESS":
                task_ids.remove(task_id)
                status.append(task_id)
            if res.state == "FAILED":
                task_ids.reverse(task_id)

    print("sending mail...")
    print("exited:", status)
    for _status in status:
        current_task = AsyncResult(_status, app=app)
        print("::", current_task.result)
        # print("::", current_task.get())
    # print("--", task_results)


@app.task
def send_testmail():
    # mail_method = os.environ.get("NOTIFIER_METHOD")

    colors = Colors()
    images = Images()
    images.webhook = False
    images.warning = False
    images.success = False

    mail_notifier = MailNotifier("marcel.tschoepe@rz.uni-freiburg.de")
    mail_notifier.add_headline(colors.headline, "Swobup Test Message", "")
    mail_notifier.set_line_color(colors.line_color_blue)
    mail_notifier.add_main_information()
    mail_notifier.add_test_text()
    mail_notifier.add_messages()
    mail_body = mail_notifier.build_mail(images)

    print("sending mail...")
    mail_notifier.send_mail(mail_body)
    print("mail sent...")

@app.task
def send_webhook_mail(messages):

    images = Images()



    print("sending mail")
    if not os.environ.get("MAIL_NOTiFICATION") == "on":
        print("mail notifications are turned off")
        return

    colors = Colors()

    # mail_method = os.environ.get("NOTIFIER_METHOD")

    print("messages", messages)



    notifications = Notifications(**messages)

    print("after import")

    print("is_hook?", notifications.is_webhook)


    mail_notifier = MailNotifier(notifications.email)


    if notifications.is_webhook:

        project_name = notifications.project
        branch = notifications.branch
        github_username = notifications.author
        commit_user = notifications.author
        commit_mailaddress = notifications.email
        commit_message = notifications.commit_text
        commit_timestamp = "now"
        commit_hash = notifications.commit_hash
        commit_url = notifications.commit_url
        mail_notifier.add_main_information(project_name=project_name, branch=branch, github_username=github_username,
                                           commit_user=commit_user, commit_mailaddress=commit_mailaddress,
                                           commit_message=commit_message, commit_timestamp=commit_timestamp,
                                           commit_hash=commit_hash, commit_url=commit_url)

        mail_notifier.add_webhook_text(commit_hash, commit_url)
        images.webhook = True
    else:
        mail_notifier.add_main_information()
        mail_notifier.add_alternate_text()
        images.webhook = False


    # mail_notifier.add_headline("#ffc000", "Swobup Test Message", "")
    mail_notifier.add_headline(colors.line_color_yellow, "Swobup Commit Report", "")
    mail_notifier.set_line_color(colors.line_color_blue)


    # mail_notifier.add_messages()
    # mail_notifier.add_job_item("fail", "Ontology could not be merged")
    # mail_notifier.add_job_item("success", "Terms successfully written")
    # mail_notifier.add_job_details("#FDF4F6", "#D22852", "Job failed")

    message_type = 1
    for message in notifications.messages:
        mail_notifier.add_job_item(message.type, message.message)
        if message.type == "fail":
            message_type = 0
            images.warning = True
        else:
            message_type = 1
            images.success = True

    if message_type == 1:
        job_type = Success()
    else:
        job_type = Warning()

    mail_notifier.add_job_details(job_type.primary_color, job_type.secondary_color, job_type.text)

    # mail_notifier.set_job_details()

    mail_body = mail_notifier.build_mail(images)

    # print("body", mail_body)

    print("sending mail...")
    mail_notifier.send_mail(mail_body)
    print("mail sent...")

