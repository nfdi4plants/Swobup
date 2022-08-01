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
    def __init__(self, str_to):
        self.strCc = os.getenv.get("NOTIFIER_ADDITIONAL_RECEIVER")
        self.port = os.getenv.get("NOTIFIER_PORT")
        self.strFrom = os.getenv.get("NOTIFIER_SENDER")
        self.password = os.getenv.get("NOTIFIER_PASSWORD")
        self.username = os.getenv.get("NOTIFIER_USERNAME")
        self.server = os.getenv.get("NOTIFIER_SERVER")
        self.method = os.getenv.get("MAIL_METHOD", "smtp")

        if self.username is None:
            self.username = self.strFrom


    def send_mail(self, message):
        context = ssl.create_default_context()
        # addresses = self.strTo + ", " + self.strCc
        # addresses = addresses.split()

        rcpt_addresses = self.strCc.split(",") + [self.strTo]

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



