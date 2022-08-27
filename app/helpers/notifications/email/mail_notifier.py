# Send an HTML email with an embedded image and a plain text message for
# email clients that don't want to display the HTML.

import smtplib, ssl, email, time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email import charset
from datetime import datetime

import os


class MailNotifier:
    def __init__(self):
        self.strCc = os.environ.get("NOTIFIER_ADDITIONAL_RECEIVER", None)
        self.port = os.environ.get("NOTIFIER_PORT")
        self.strFrom = os.environ.get("NOTIFIER_SENDER")
        self.password = os.environ.get("NOTIFIER_PASSWORD")
        self.username = os.environ.get("NOTIFIER_USERNAME")
        self.server = os.environ.get("NOTIFIER_SERVER")
        self.method = os.environ.get("MAIL_METHOD", "smtp")
        self.strTo = "marcel.tschoepe@rz.uni-freiburg.de"

        self.template_path = "app/helpers/notifications/email/templates/html/"

        self.html_message = ""
        self.text_message = ""

        self.job_items = ""
        self.job_details = ""

        print(os.getcwd())

        self.html_message = open(self.template_path + "main.html", "r").read()


        if self.username is None:
            self.username = self.strFrom

    def add_headline(self, color, message, repository_name):
        headline_file = open(self.template_path + "headline.html", "r").read()
        headline_file = headline_file.replace('$ALERT_COLOR', color)
        headline_file = headline_file.replace('$ALERT_MESSAGE', message)
        headline_file = headline_file.replace('$REPO_NAME', repository_name)
        self.html_message = self.html_message.replace('$MAIN_ALERT', headline_file)

    def set_line_color(self, hex_value):
        self.html_message = self.html_message.replace('$LINE_COLOR', hex_value)

    def add_main_information(self, **kwargs):

        print("kwargs", kwargs)

        project_name =  kwargs.get("project_name")
        branch = kwargs.get("branch")
        github_username = kwargs.get("github_username")
        commit_user = kwargs.get("commit_user")
        commit_mailaddress = kwargs.get("commit_mailaddress")
        commit_message = kwargs.get("commit_message")
        commit_timestamp = kwargs.get("commit_timestamp")
        commit_hash = kwargs.get("commit_hash")

        if not kwargs:
            main_info_file = ""
        else:
            main_info_file = open(self.template_path + "main_information.html", "r").read()
            main_info_file = main_info_file.replace('$GITHUB_PROJECT', project_name)
            main_info_file = main_info_file.replace('$COMMIT_BRANCH', branch)
            main_info_file = main_info_file.replace('$AUTHOR', github_username)
            main_info_file = main_info_file.replace('$COMMIT_NAME', commit_user)
            main_info_file = main_info_file.replace('$EMAIL', commit_mailaddress)
            main_info_file = main_info_file.replace('$COMMIT_MESSAGE', commit_message)
            main_info_file = main_info_file.replace('$COMMIT_TIMESTAMP', commit_timestamp)
            main_info_file = main_info_file.replace('$COMMIT_HASH', commit_hash)


        self.html_message = self.html_message.replace('$MAIN_INFORMATION', main_info_file)

    def add_messages(self):
        self.html_message = self.html_message.replace('$MESSAGES', "")

    def add_test_text(self):
        body_text = open(self.template_path + "testmail_text.html", "r").read()
        self.html_message = self.html_message.replace('$TEXT', body_text)

    def add_webhook_text(self):
        body_text = open(self.template_path + "webhook_text.html", "r").read()
        self.html_message = self.html_message.replace('$TEXT', body_text)

    def add_job_details(self, alert_color, text_color, alert_text):
        job_details = open(self.template_path + "job_details.html", "r").read()
        job_details = job_details.replace('$ALERT_COLOR', alert_color)
        job_details = job_details.replace('$TEXT_COLOR', text_color)
        job_details = job_details.replace('$ALERT_TEXT', alert_text)
        job_details = job_details.replace('$JOB_ITEMS', self.job_items)

        self.html_message = self.html_message.replace('$MESSAGES', job_details)
        # self.job_details =self.job_details + job_details


    # alternative method sets job details
    # def set_job_details(self):
    #     self.html_message = self.html_message.replace('$MESSAGES', self.job_details)

    def add_job_item(self, type, text):
        job_item = open(self.template_path + "job_item.html", "r").read()

        if type == "success":
            job_icon = "cid:check-green"
        else:
            job_icon = "cid:red-cross"


        job_item= job_item.replace('$JOB_ICON', job_icon)
        job_item = job_item.replace('$JOB_TEXT', text)

        self.job_items = self.job_items + job_item

    def build_mail(self):

        print("html is now", self.html_message)

        # Create the root message and fill in the from, to, and subject headers
        msgRoot = MIMEMultipart('related')
        msgRoot['Subject'] = "Swobup Commit Report"
        msgRoot['From'] = self.strFrom
        msgRoot['To'] = self.strTo
        msgRoot['Cc'] = self.strCc
        # msgRoot['Date'] = time.ctime(time.time())
        msgRoot['Date'] = email.utils.formatdate(localtime=True)
        msgRoot['Message-ID'] = email.utils.make_msgid()

        msgRoot.preamble = 'This is a multi-part message in MIME format.'

        # Encapsulate the plain and HTML versions of the message body in an
        # 'alternative' part, so message agents can decide which they want to display.
        msgAlternative = MIMEMultipart('alternative')
        msgRoot.attach(msgAlternative)

        msgText = MIMEText('This is the alternative plain text message.')

        # msgText = "test"

        # msgText = MIMEText(msgText)
        msgAlternative.attach(msgText)

        # We reference the image in the IMG SRC attribute by the ID we give it below
        msgText = MIMEText(self.html_message, 'html')
        msgAlternative.attach(msgText)

        # This example assumes the image is in the current directory
        # fp = open(self.template_path + 'logo-blue-text-lightblue.png', 'rb')
        fp = open(self.template_path + 'logo-blue-small.png', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<swobup-logo>')
        msgRoot.attach(msgImage)

        fp = open(self.template_path + 'twitter-logo.png', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<twitter-logo>')
        msgRoot.attach(msgImage)

        fp = open(self.template_path + 'github-logo-white.png', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<github-logo>')
        msgRoot.attach(msgImage)

        fp = open(self.template_path + 'dataplant-logo.png', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<dataplant-logo>')
        msgRoot.attach(msgImage)


        # fp = open(self.template_path + 'logo-blue.png', 'rb')
        fp = open(self.template_path + 'swobup-logo-black.png', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<swobup-logo-black>')
        msgRoot.attach(msgImage)

        fp = open(self.template_path + 'red-cross.gif', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<red-cross>')
        msgRoot.attach(msgImage)

        fp = open(self.template_path + 'check-green-inverted.gif', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<check-green>')
        msgRoot.attach(msgImage)

        fp = open(self.template_path + 'branch-grey.gif', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<branch-grey>')
        msgRoot.attach(msgImage)

        fp = open(self.template_path + 'commit-grey.gif', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<commit-grey>')
        msgRoot.attach(msgImage)

        return msgRoot

    def send_mail(self, message):
        context = ssl.create_default_context()

        if self.strCc is not None:
            rcpt_addresses = self.strCc.split(",") + [self.strTo]
        else:
            rcpt_addresses = [self.strTo]

        if self.method == "smtp":
            with smtplib.SMTP_SSL(self.server, self.port, context=context) as server:
                server.login(self.username, self.password)
                server.sendmail(
                    self.strFrom, rcpt_addresses, message.as_string()
                )
                server.quit()
        else:

            with smtplib.SMTP(self.server, self.port) as server:
                server.starttls(context=context)
                server.ehlo()
                server.login(self.username, self.password)
                server.sendmail(
                    self.strFrom, rcpt_addresses, message.as_string()
                )
                server.quit()
