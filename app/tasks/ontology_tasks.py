import base64
import io
import json

import obonet
import networkx
import datetime
import sys
import pandas as pd
from io import StringIO

import requests

from celery import chain

from tasks import app
from app.github.webhook_payload import PushWebhookPayload
from app.github.downloader import GitHubDownloader

from app.helpers.models.building_type import BuildingType
from app.helpers.obo_parser import OBO_Parser

from app.helpers.general_downloader import GeneralDownloader

from app.helpers.models.building_type import BuildingObjects
from app.helpers.swate_api import SwateAPI

from app.helpers.models.templates.template import Template

from app.neo4j.neo4jConnection import Neo4jConnection

from app.tasks.database_tasks import update_ontologies
from app.tasks.mail_task import show_tasks_results, send_webhook_mail

from resource import *

from app.tasks.database_tasks import add_ontologies
from app.helpers.notifications.models.notification_model import Notifications

from celery.backends.s3 import S3Backend
from celery.backends.base import BaseKeyValueStoreBackend
from app.helpers.storage_backend import StorageBackend

@app.task
def add_ontology(url):

    general_downloader = GeneralDownloader(url)
    current_file = general_downloader.download_file()

    # print("after download:", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 / 1024)


    # ontology_buffer = StringIO(current_file)

    ontology_buffer = io.TextIOWrapper(current_file, newline=None)

    obo_parser = OBO_Parser(ontology_buffer)
    data = obo_parser.parse()
    print("parsing finished")

    # print("end of", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 /1024)

    return data

# old task
@app.task
def add_ontology_from_scratch(file_object:dict):

    print("file_object is", file_object)

    if file_object.get("type") == "obo":
        pass
    if file_object.get("type") == "include":
        url = file_object.get("url")

        result = requests.get(url)
        data = json.loads(result.content)
        decoded_content = base64.b64decode(data["content"])

        print("dec", decoded_content)
        url_list = decoded_content.decode().splitlines()

        for url in url_list:
            result = chain(add_ontology.s(url), add_ontologies.s()).apply_async()
            print("resutl", result)


        # return data

@app.task
def delete_ontology_task(payload):

    conn = Neo4jConnection()

    print("payload", payload)

    if payload.get("url"):
        print("url is available")

    if payload.get("ontology"):
        print("ontologies were given")
        for ontology_name in payload.get("ontology"):
            conn.delete_ontology(ontology_name)


@app.task(bind=True)
def add_ontology_task(self, url, **notis):

    print("payload", notis)
    notifications = notis.get("notifications")
    if notifications:
        notifications = Notifications(**notifications)
    else:
        notifications = Notifications(messages=[])
        notifications.is_webhook = False

    print("pay", notifications)

    general_downloader = GeneralDownloader(url)
    current_file = general_downloader.download_file()

    ontology_buffer = io.TextIOWrapper(current_file, newline=None)

    obo_parser = OBO_Parser(ontology_buffer)
    data = obo_parser.parse(notifications)

    # stop if ontology could not be parsed
    if data is None:
        notifications_json = notifications.dict()
        res = {"task_id": self.request.id, "notifications": notifications_json}
        return res

    print("parsing finished")

    base_backend = BaseKeyValueStoreBackend(app=app)
    print("before storage backend")
    backend = StorageBackend()
    # backend = S3Backend(app=app)
    s3_key = base_backend.get_key_for_task(self.request.id).decode()

    # s3_key = backend.get_key_for_task(self.request.id).decode()
    s3_key = str(s3_key)+"-results"
    print("s3_key", s3_key)
    backend.set(key=s3_key, value=json.dumps(data))


    notifications_json = notifications.dict()
    res = {"task_id": str(s3_key)}
    res["notifications"] = notifications_json

    print("s3 uploaded...")

    return res


@app.task(bind=True)
def process_ext_ontolgies(self, url_tuple, **notifications):

    notifications = notifications.get("notifications")
    if notifications:
        notifications = Notifications(**notifications)
    else:
        notifications = Notifications(messages=[])
        notifications.is_webhook = False

    before_list = []
    after_list = []

    before_url = url_tuple[0]
    after_url = url_tuple[1]

    before_downloader = GeneralDownloader(before_url)
    after_downloader = GeneralDownloader(after_url)

    before_file = before_downloader.download_file()
    after_file = after_downloader.download_file()

    before_file_buffer = io.TextIOWrapper(before_file, newline=None)
    after_file_buffer = io.TextIOWrapper(after_file, newline=None)

    for line in before_file_buffer.read().splitlines():
        before_list.append(line)

    for line in after_file_buffer.read().splitlines():
        after_list.append(line)

    new_ontology_urls = list(set(after_list).difference(before_list))

    notifications_json = notifications.dict()

    for url in new_ontology_urls:
        chain(add_ontology_task.s(url, notifications=notifications_json), update_ontologies.s(),
              send_webhook_mail.s()).apply_async()






