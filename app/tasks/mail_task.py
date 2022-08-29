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

    mail_notifier = MailNotifier()
    mail_notifier.add_headline("#ffc000", "Swobup Test Message", "")
    mail_notifier.set_line_color("#4caed3")
    mail_notifier.add_main_information()
    mail_notifier.add_test_text()
    mail_notifier.add_messages()
    mail_body = mail_notifier.build_mail()

    print("sending mail...")
    mail_notifier.send_mail(mail_body)
    print("mail sent...")


@app.task
def send_webhook_mail(messages):
    # mail_method = os.environ.get("NOTIFIER_METHOD")

    project_name = "nfdi4plants/ontology_nfdi4pso"
    branch = "main"
    github_username = "Zersk"
    commit_user = "Zersk"
    commit_mailaddress = "marcel.tschoepe@gmail.com"
    commit_message = "This is a test"
    commit_timestamp = "now"
    commit_hash = "e3834hc9s823"

    mail_notifier = MailNotifier()
    # mail_notifier.add_headline("#ffc000", "Swobup Test Message", "")
    mail_notifier.add_headline("#79daca", "Swobup Test Message", "")
    mail_notifier.set_line_color("#4caed3")
    mail_notifier.add_main_information(project_name= project_name, branch=branch, github_username=github_username, commit_user=commit_user,
                                       commit_mailaddress=commit_mailaddress, commit_message=commit_message,
                                       commit_timestamp=commit_timestamp, commit_hash=commit_hash)
    mail_notifier.add_webhook_text()
    # mail_notifier.add_messages()
    # mail_notifier.add_job_item("fail", "Ontology could not be merged")
    # mail_notifier.add_job_item("success", "Terms successfully written")
    # mail_notifier.add_job_details("#FDF4F6", "#D22852", "Job failed")

    mail_notifier.add_job_item("fail", "Name of Term AC:10001 is capitalized")
    mail_notifier.add_job_item("success", "Terms successfully written")
    mail_notifier.add_job_item("success", "Relationships successfully written")
    mail_notifier.add_job_details("#79daca", "#093a32", "Job successful")

    # mail_notifier.set_job_details()

    mail_body = mail_notifier.build_mail()

    # print("body", mail_body)

    print("sending mail...")
    mail_notifier.send_mail(mail_body)
    print("mail sent...")

@app.task
def send_webhook_mail2(messages):
    if not os.environ.get("MAIL_NOTiFICATION") == "on":
        print("mail notifications are turned off")
        return

    # mail_method = os.environ.get("NOTIFIER_METHOD")

    project_name = "nfdi4plants/ontology_nfdi4pso"
    branch = "main"
    github_username = "Zersk"
    commit_user = "Zersk"
    commit_mailaddress = "marcel.tschoepe@gmail.com"
    commit_message = "This is a test"
    commit_timestamp = "now"
    commit_hash = "e3834hc9s823"

    mail_notifier = MailNotifier()
    # mail_notifier.add_headline("#ffc000", "Swobup Test Message", "")
    mail_notifier.add_headline("#79daca", "Swobup Test Message", "")
    mail_notifier.set_line_color("#4caed3")
    mail_notifier.add_main_information(project_name= project_name, branch=branch, github_username=github_username, commit_user=commit_user,
                                       commit_mailaddress=commit_mailaddress, commit_message=commit_message,
                                       commit_timestamp=commit_timestamp, commit_hash=commit_hash)
    mail_notifier.add_webhook_text()
    # mail_notifier.add_messages()
    # mail_notifier.add_job_item("fail", "Ontology could not be merged")
    # mail_notifier.add_job_item("success", "Terms successfully written")
    # mail_notifier.add_job_details("#FDF4F6", "#D22852", "Job failed")

    for message in messages:

        mail_notifier.add_job_item("fail", message)

    mail_notifier.add_job_details("#79daca", "#093a32", "Job successful")

    # mail_notifier.set_job_details()

    mail_body = mail_notifier.build_mail()

    # print("body", mail_body)

    print("sending mail...")
    mail_notifier.send_mail(mail_body)
    print("mail sent...")

