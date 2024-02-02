import base64
import json
import os

import sys

import pandas as pd
import requests

from app.github.github_api import GithubAPI
from tasks import app

from app.helpers.general_downloader import GeneralDownloader
from app.helpers.swate_api import SwateAPI

from app.helpers.models.templates.template import Template

# from app.neo4j.neo4jConnection import Neo4jConnection
from app.helpers.notifications.models.notification_model import Notifications, Message

# from app.neo4j_conc.neo4jConnection import Neo4jConnection
from app.neo4j_conc.neo4jConnection import Neo4jConnection
from app.neo4j_conc.template_operations import *


# @app.task(name="adding template to DB")
# def add_template_custom(url, **notis):
#
#     notifications = notis.get("notifications")
#
#     if notifications:
#         notifications = Notifications(**notifications)
#     else:
#         notifications = Notifications(messages=[])
#         notifications.is_webhook = False
#
#     # notifications = Notifications(**notifications)
#
#     general_downloader = GeneralDownloader(url)
#     current_file = general_downloader.retrieve_xslx()
#     swate_api = SwateAPI()
#
#     converted_json = swate_api.convert_xslx(current_file)
#
#     if converted_json.get("error") is not None:
#         notifications.messages.append(Message(type="fail", message=converted_json.get("error")))
#         notifications = notifications.dict()
#         return notifications
#
#
#     template = Template.parse_obj(converted_json)
#
#     conn = Neo4jConnection()
#     status = conn.check()
#
#     if status is False:
#         print("database not connected")
#         notifications.messages.append(Message(type="fail", message="Could not connect to database"))
#         notifications = notifications.dict()
#         return notifications
#
#     print("adding template: ", template.Name)
#     conn.update_template(template)
#     print("adding template finished: ", template.Name)
#
#     notifications.messages.append(
#         Message(type="success", message="Template " + "<b>" + template.Name + "</b>" + " successfully written "
#                                                                                        "to database"))
#
#     result = {}
#     notifications_json = notifications.dict()
#     result = notifications_json
#
#     return result



@app.task(name="adding template to DB")
def add_templates(url, **notis):

    notifications = notis.get("notifications")

    if notifications:
        notifications = Notifications(**notifications)
    else:
        notifications = Notifications(messages=[])
        notifications.is_webhook = False

    # notifications = Notifications(**notifications)

    general_downloader = GeneralDownloader(url)
    current_file = general_downloader.retrieve_xslx()
    swate_api = SwateAPI()

    converted_json = swate_api.convert_xslx(current_file)

    print("json is", converted_json)

    if converted_json.get("error") is not None:
        notifications.messages.append(Message(type="fail", message=converted_json.get("error")))
        notifications = notifications.dict()
        return notifications


    template = Template.parse_obj(converted_json)

    if template.Id is None:
        print("template has no id")
        return

    # conn = Neo4jConnection()
    # status = conn.check()
    #
    # if status is False:
    #     print("database not connected")
    #     notifications.messages.append(Message(type="fail", message="Could not connect to database"))
    #     notifications = notifications.dict()
    #     return notifications

    print("json", template.json())


    print("adding template: ", template.Name)

    data_list = []
    data_list.append(converted_json)

    dataframe = pd.DataFrame(data_list, index=None)


    # sys.exit()
    conn = Neo4jConnection()

    query = add_template(dataframe)
    conn = Neo4jConnection()
    conn.write(query)

    # conn.write(template)
    print("adding template finished: ", template.Name)

    notifications.messages.append(
        Message(type="success", message="Template " + "<b>" + template.Name + "</b>" + " successfully written "
                                                                                       "to database"))

    result = {}
    notifications_json = notifications.dict()
    result = notifications_json

    return result



@app.task(name="deleting template")
def delete_template_task(template_id, **notifications):
    # if notifications:
    #     notifications = Notifications(**notifications)
    # else:
    #     notifications = Notifications(messages=[])
    #     notifications.is_webhook = False
    #
    # notifications = Notifications(**notifications)

    print("deleting id", template_id)

    neo4j_conn = Neo4jConnection()

    query = delete_template(template_id)
    print("query", query)


    neo4j_conn.write(query)



    # Quickfix
    # template_id = template_id.replace("-", "_")

    # conn.delete_template(template_id)

    # result = {}
    # notifications_json = notifications.dict()
    # result["notifications"] = notifications_json

@app.task(name="deleting template")
def delete_template_custom(template_id, **notifications):
    # if notifications:
    #     notifications = Notifications(**notifications)
    # else:
    #     notifications = Notifications(messages=[])
    #     notifications.is_webhook = False
    #
    # notifications = Notifications(**notifications)

    conn = Neo4jConnection()

    # Quickfix
    # template_id = template_id.replace("-", "_")

    conn.delete_template(template_id)

    # result = {}
    # notifications_json = notifications.dict()
    # result["notifications"] = notifications_json


@app.task
def delete_template_all_custom():
    query = delete_all_templates()


    neo4j_conn = Neo4jConnection()
    neo4j_conn.write(query)

    # conn = Neo4jConnection()
    # conn.delete_template_all()


# @app.task(name="build templates from scratch")
# def template_build_from_scratch_old():
#     repository_name = os.environ.get("TEMPLATE_REPOSITORY", "nfdi4plants/SWATE_templates")
#     branch = "main"
#
#     github_api = GithubAPI(repository_name=repository_name)
#     file_list = github_api.get_master_tree(branch).get("tree")
#
#     files = []
#
#     for file in file_list:
#         print("ff", file.get("path"))
#         if ".xlsx" in file.get("path"):
#             files.append(file.get("url"))
#
#     for file in files:
#         result = requests.get(file)
#         data = json.loads(result.content)
#         decoded_content = base64.b64decode(data["content"])
#
#         swate_api = SwateAPI()
#         converted_json = swate_api.convert_xslx(decoded_content)
#
#         template = Template.parse_obj(converted_json)
#
#         conn = Neo4jConnection()
#         print("adding template: ", template.Name)
#         conn.update_template(template)
#         print("adding template finished: ", template.Name)


@app.task(name="build templates from scratch")
def template_build_from_scratch():
    repository_name = os.environ.get("TEMPLATE_REPOSITORY", "nfdi4plants/SWATE_templates")
    branch = "main"

    github_api = GithubAPI(repository_name=repository_name)
    file_list = github_api.get_master_tree(branch).get("tree")

    files = []
    # data_list = []

    for file in file_list:
        current_path = github_api.convert_to_raw_url(file.get("path"), branch)
        print("ff", file.get("path"))
        if ".xlsx" in current_path:
            files.append(current_path)

    for file in files:
        result = requests.get(file)
        # data = json.loads(result.content)
        # decoded_content = base64.b64decode(data["content"])

        swate_api = SwateAPI()
        converted_json = swate_api.convert_xslx(result.content)

        print("conv_json", converted_json)
        # data_list.append(converted_json)
        data_list = []
        data_list.append(converted_json)

        dataframe = pd.DataFrame(data_list, index=None)

        try:
            query = add_template(dataframe)
            conn = Neo4jConnection()
            conn.write(query)
        except:
            print("error in file", converted_json)

        # template = Template.parse_obj(converted_json)





        # print("adding template: ", template.Name)
        # # conn.update_template(template)
        # print("adding template finished: ", template.Name)
