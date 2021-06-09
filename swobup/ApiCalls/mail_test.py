import falcon
import json
import datetime

from io import BytesIO

import sys

from ..helpers.configurator import Configurator
from ..helpers.gitHub_downloader import GithubDownloader

from ..helpers.database.database_connector import *

from ..helpers.request_store import RequestStore

from ..templates.template_collector import TemplateCollector

from ..helpers.message_collector import MessageCollector

from ..templates.template_store import TemplateStore

from ..helpers.mail.mail_notifier import MailNotifier


class MailTest(object):

    def on_post(self, req, resp):
        # database handler should be in a middleware in a future version

        config = Configurator("swobup/config/config.conf")

        message_collector = MessageCollector()

        body = json.loads(RequestStore.body)

        mail_server = body.get("mail_server").get("mail_server")
        mail_password = body.get("mail_server").get("mail_password")
        mail_sender = body.get("mail_server").get("mail_sender")
        mail_additional = body.get("mail_server").get("mail_additional")
        mail_method = body.get("mail_server").get("mail_method")

        repository_name = body.get("message").get("repository")
        commit_hash = body.get("message").get("commit_hash")

        commit_user = body.get("message").get("commit_user")
        commit_mail = body.get("message").get("commit_mail")
        github_username = body.get("message").get("github_username", "None")

        commit_url = body.get("message").get("commit_url")
        commit_message = body.get("message").get("commit_message", "None")
        commit_timestamp = body.get("message").get("commit_timestamp", "None")

        # send notifications as email
        mail_notifier = MailNotifier(mail_sender, commit_mail, mail_additional, mail_password, mail_server,
                                     github_username,
                                     commit_user, commit_mail, commit_url, commit_message, commit_hash,
                                     commit_timestamp)

        mail_notifier.add_headline("Headline 1")
        mail_notifier.add_message_table_start()
        mail_notifier.add_message_line("info message")
        mail_notifier.add_message_line("error message")
        mail_notifier.add_message_table_end()

        mail_notifier.add_headline("Headline 2")
        mail_notifier.add_message_table_start()
        mail_notifier.add_message_line("message 2")
        mail_notifier.add_message_table_end()

        mail_message = mail_notifier.build_mail(repository_name)
        print("sending mail")
        print("method", mail_method)

        if mail_method == "starttls":
            mail_notifier.send_mail_starttls(mail_message)

        if mail_method == "smtps":
            print("sending with smtps")
            mail_notifier.send_mail_smtps(mail_message)

        # return HTTP response

        result_json = {
            "status": "job done"
            # "error": message_collector.get_error_messages()
        }

        # message_collector.cleanup()
        resp.body = json.dumps(result_json, ensure_ascii=False)
        resp.status = falcon.HTTP_200
