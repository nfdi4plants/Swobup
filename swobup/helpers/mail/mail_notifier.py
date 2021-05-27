# Send an HTML email with an embedded image and a plain text message for
# email clients that don't want to display the HTML.

import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email import charset
import os


class MailNotifier:
    def __init__(self, str_from, str_to, str_cc, password, server, github_username, sender_name,
                 sender_mail, commit_url, commit_message, commit_hash, commit_timestamp):
        # config = Configurator("swobup/config/config.conf")

        self.strFrom = str_from
        self.strTo = str_to
        self.strCc = str_cc
        self.password = password
        self.server = server

        self.github_username = github_username
        self.sender_name = sender_name
        self.commit_url = commit_url
        self.commit_mail = sender_mail
        self.commit_message = commit_message
        self.commit_hash = commit_hash
        self.commit_timestamp = commit_timestamp

        self.messages = ""
        self.text_messages = ""

    def send_mail(self, message):
        context = ssl.create_default_context()
        addresses = self.strTo + ", " + self.strCc
        addresses = addresses.split()

        with smtplib.SMTP_SSL(self.server, 465, context=context) as server:
            server.login(self.strFrom, self.password)
            server.sendmail(
                self.strFrom, addresses, message.as_string()
            )

    def add_headline(self, headline):
        html_file = open("swobup/helpers/mail/mail_templates/html/message_headline.html", "r").read()

        html_file = html_file.replace('$MESSAGE_HEAD_LINE', headline)

        self.messages = self.messages + html_file
        self.text_messages = self.text_messages + headline + ": \n\n"

    def add_message_line(self, message):
        html_file = open("swobup/helpers/mail/mail_templates/html/message_line.html", "r").read()

        html_file = html_file.replace('$MESSAGE_LINE', message)

        self.messages = self.messages + html_file
        self.text_messages = self.text_messages + " * " + message + "\n"

    def add_message_table_start(self):
        html_file = open("swobup/helpers/mail/mail_templates/html/message_table-start.html", "r").read()
        self.messages = self.messages + html_file

    def add_message_table_end(self):
        html_file = open("swobup/helpers/mail/mail_templates/html/message_table.html", "r").read()
        self.messages = self.messages + html_file


    def build_mail(self, repository_name):
        # Create the root message and fill in the from, to, and subject headers
        msgRoot = MIMEMultipart('related')
        msgRoot['Subject'] = 'Swobup Commit Report for repository: ' + repository_name
        msgRoot['From'] = self.strFrom
        msgRoot['To'] = self.strTo
        msgRoot['Cc'] = self.strCc
        msgRoot.preamble = 'This is a multi-part message in MIME format.'

        # Encapsulate the plain and HTML versions of the message body in an
        # 'alternative' part, so message agents can decide which they want to display.
        msgAlternative = MIMEMultipart('alternative')
        msgRoot.attach(msgAlternative)

        msgText = MIMEText('This is the alternative plain text message.')
        msgText = open("swobup/helpers/mail/mail_templates/text/message.txt", "r").read()

        msgText = msgText.replace('$GITHUB_USERNAME', self.github_username)
        msgText = msgText.replace('$COMMIT_NAME', self.sender_name)
        msgText = msgText.replace('$COMMIT_MAIL', self.commit_mail)
        msgText = msgText.replace('$COMMIT_MESSAGE', self.commit_message)
        msgText = msgText.replace('$COMMIT_URL', self.commit_url)
        msgText = msgText.replace('$COMMIT_HASH', self.commit_hash)
        msgText = msgText.replace('$COMMIT_TIMESTAMP', self.commit_timestamp)


        msgText = msgText.replace('$REPO_NAME', repository_name)

        msgText = msgText + self.text_messages
        msgText = msgText.replace("<b>", "")
        msgText = msgText.replace("</b>", "")

        msgText = MIMEText(msgText)

        msgAlternative.attach(msgText)

        html_file = open("swobup/helpers/mail/mail_templates/html/main.html", "r").read()

        html_file = html_file.replace('$GITHUB_USERNAME', self.github_username)
        html_file = html_file.replace('$REPO_NAME', repository_name)
        html_file = html_file.replace('$COMMIT_NAME', self.sender_name)
        html_file = html_file.replace('$COMMIT_MAIL', self.commit_mail)
        html_file = html_file.replace('$COMMIT_MESSAGE', self.commit_message)
        html_file = html_file.replace('$COMMIT_URL', self.commit_url)
        html_file = html_file.replace('$COMMIT_HASH', self.commit_hash)
        html_file = html_file.replace('$COMMIT_TIMESTAMP', self.commit_timestamp)

        html_file = html_file.replace('$MESSAGES', self.messages)

        # We reference the image in the IMG SRC attribute by the ID we give it below
        msgText = MIMEText(html_file, 'html')
        msgAlternative.attach(msgText)

        # This example assumes the image is in the current directory
        fp = open('swobup/helpers/mail/mail_templates/html/swobup-logo-light.png', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<swobup-logo>')
        msgRoot.attach(msgImage)

        fp = open('swobup/helpers/mail/mail_templates/html/twitter-logo.png', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<twitter-logo>')
        msgRoot.attach(msgImage)

        fp = open('swobup/helpers/mail/mail_templates/html/github-logo-white.png', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<github-logo>')
        msgRoot.attach(msgImage)

        fp = open('swobup/helpers/mail/mail_templates/html/dataplant-logo.png', 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()

        # Define the image's ID as referenced above
        msgImage.add_header('Content-ID', '<dataplant-logo>')
        msgRoot.attach(msgImage)

        return msgRoot


if __name__ == "__main__":
    mail_connector = MailNotifier()

    mail_connector.add_headline("Headline")
    mail_connector.add_message_line("info message")

    mail_connector.add_headline("Headline 2")
    mail_connector.add_message_line("message 2")

    repository_name = "Test"

    mail_message = mail_connector.build_mail(repository_name)
    mail_connector.send_mail(mail_message)
