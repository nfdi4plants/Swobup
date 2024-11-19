import base64
import io
import json

import obonet
import networkx
import datetime
import sys
import pandas as pd
from io import StringIO
import pronto

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
from app.helpers.notifications.models.notification_model import Notifications, Message

from celery.backends.s3 import S3Backend
from celery.backends.base import BaseKeyValueStoreBackend
from app.helpers.storage_backend import StorageBackend

from app.helpers.models.ontology.obo_file import *


# def convert_owl_to_obo_in_memory(input_file: str):
#     # Load the OWL file
#     ontology = pronto.Ontology(input_file)
#
#     # Create an in-memory bytes buffer
#     obo_bytes = io.BytesIO()
#
#     # Save the ontology in OBO format to the buffer
#     ontology.dump(obo_bytes, format='obo')
#
#     # Seek to the beginning of the BytesIO object
#     obo_bytes.seek(0)
#
#     # Read the content from the BytesIO object as a text string
#     obo_str = obo_bytes.read().decode('utf-8')
#
#     # Use a StringIO object to read it with obonet
#     obo_io = io.StringIO(obo_str)
#
#     # Parse the OBO content using obonet
#     graph = obonet.read_obo(obo_io)
#
#     print(f"Conversion and parsing successful: {input_file}")
#
#     return graph

# def convert_owl_to_obo(input_file: str) -> str:
#     # Load the OWL file
#     ontology = pronto.Ontology(input_file)
#     # Create a binary stream instead of a file
#     binary_stream = io.BytesIO()
#     # Save the ontology in OBO format
#     ontology.dump(binary_stream, format='obo')
#     # Get the OBO content from the binary stream
#     obo_content = binary_stream.getvalue().decode('utf-8')
#     # Close the stream
#     binary_stream.close()
#     print(f"Conversion and parsing successful: {input_file}")
#     return obo_content


def convert_owl_to_obo(input_file: str) -> str:
    try:
        # Load the OWL file
        ontology = pronto.Ontology(input_file)
        # Create a binary stream instead of a file
        binary_stream = io.BytesIO()
        # Save the ontology in OBO format
        ontology.dump(binary_stream, format='obo')
        # Get the OBO content from the binary stream
        obo_content = binary_stream.getvalue().decode('utf-8')
        # Close the stream
        binary_stream.close()
        print("returning obo conversion")
        return obo_content
    except Exception as e:
        print("Failed to convert OWL to OBO: %s", e)
        raise RuntimeError(f"Failed to convert OWL to OBO: {e}")

@app.task
def delete_ontology_task(payload):

    conn = Neo4jConnection()

    print("payload", payload)

    if payload.get("ontology"):
        for ontology_name in payload.get("ontology"):
            conn.delete_ontology(ontology_name)


@app.task(name="parsing ontologies", bind=True)
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

    # if url.endswith(".owl"):
    #     print("owl file detected")
    #     ontology_buffer = convert_owl_to_obo(current_file)
    # else:
    #     ontology_buffer = io.TextIOWrapper(current_file, newline=None)

    # data = None
    #
    #
    # try:
    #     if url.endswith(".owl"):
    #         print("owl file detected")
    #         ontology_buffer = convert_owl_to_obo(url)
    #     else:
    #         ontology_buffer = io.TextIOWrapper(current_file, newline=None)
    #
    #     obo_parser = OBO_Parser(ontology_buffer)
    #     data = obo_parser.parse(notifications)
    # except Exception as e:
    #     print("e", e)
    #     notifications.messages.append(f"Error in Pronto conversion. Detailed message: {e}")
    #     # raise self.retry(exc=e)

    data = None

    # if url.endswith(".owl"):
    #     print("owl file detected")
    #     try:
    #         obo_converted = convert_owl_to_obo(current_file)
    #
    #         # ontology_buffer = io.TextIOWrapper(obo_converted, newline=None)
    #
    #         ontology_buffer = io.TextIOWrapper(io.BytesIO(obo_converted.encode('utf-8')), newline=None)
    #
    #         obo_parser = OBO_Parser(ontology_buffer)
    #
    #         data = obo_parser.parse(notifications)
    #     except:
    #         print("failed")
    #         data = None
    #         notifications.messages.append(Message(type="fail", message="Error in Pronto conversion"))
    #
    #         print(f"notificatoins {notifications}")
    # else:
    #     ontology_buffer = io.TextIOWrapper(current_file, newline=None)
    #
    #     # print("ontology buffer", ontology_buffer)
    #     print("after ontology buffer", ontology_buffer)
    #
    #     obo_parser = OBO_Parser(ontology_buffer)
    #     data = obo_parser.parse(notifications)
    #
    #
    #     print("data is", data)
    #
    #     # print("data", data)
    #
    #     print("finished")


    # if url.endswith(".owl"):
    #     print("owl file detected")
    #     try:
    #         obo_converted = convert_owl_to_obo(current_file)
    #
    #         # ontology_buffer = io.TextIOWrapper(obo_converted, newline=None)
    #
    #         ontology_buffer = io.TextIOWrapper(io.BytesIO(obo_converted.encode('utf-8')), newline=None)
    #
    #         obo_parser = OBO_Parser(ontology_buffer)
    #
    #         data = obo_parser.parse(notifications)
    #     except:
    #         print("failed")
    #         data = None
    #         notifications.messages.append(Message(type="fail", message="Error in Pronto conversion"))
    #
    #         print(f"notificatoins {notifications}")
    # else:
    #     ontology_buffer = io.TextIOWrapper(current_file, newline=None)
    #
    #     # print("ontology buffer", ontology_buffer)
    #     print("after ontology buffer", ontology_buffer)
    #
    #     obo_parser = OBO_Parser(ontology_buffer)
    #     data = obo_parser.parse(notifications)
    #
    #
    #     print("data is", data)
    #
    #     # print("data", data)
    #
    #     print("finished")


    if url.endswith(".owl"):
        print("owl file detected")
        try:
            obo_converted = convert_owl_to_obo(current_file)

            ontology_buffer = io.TextIOWrapper(io.BytesIO(obo_converted.encode('utf-8')), newline=None)

            # obo_parser = OBO_Parser(ontology_buffer)

            # data = obo_parser.parse(notifications)
        except:
            print("failed")
            # data = None
            ontology_buffer = None
            # notifications.messages.append(Message(type="fail", message="Error in Pronto conversion"))

            print(f"notificatoins {notifications}")
    else:
        ontology_buffer = io.TextIOWrapper(current_file, newline=None)


    obo_parser = OBO_Parser(ontology_buffer)
    data = obo_parser.parse(notifications)




    # stop if ontology could not be parsed
    # if data is None:
    #     print("data is None")
    #     notifications_json = notifications.dict()
    #     res = {"task_id": self.request.id, "notifications": notifications_json}
    #     return res

    # if data is None:
    #     data = {"terms":[], "relationships":[], "ontologies":[]}

    print("parsing finished")

    base_backend = BaseKeyValueStoreBackend(app=app)
    print("before storage backend")
    backend = StorageBackend()
    # backend = S3Backend(app=app)
    s3_key = base_backend.get_key_for_task(self.request.id).decode()

    # s3_key = backend.get_key_for_task(self.request.id).decode()
    # s3_key = str(s3_key)+"-results"

    s3_key = f"{s3_key}-results"
    print("s3_key", s3_key)
    backend.set(key=s3_key, value=json.dumps(data))


    notifications_json = notifications.dict()
    res = {"task_id": str(s3_key)}
    res["notifications"] = notifications_json

    print("s3 uploaded...")

    return res


@app.task(name="processing ext ontologies", bind=True)
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






