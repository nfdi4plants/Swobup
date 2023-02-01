import base64
import json
import os
import requests

from app.github.github_api import GithubAPI
from tasks import app

from app.helpers.general_downloader import GeneralDownloader
from app.helpers.swate_api import SwateAPI

from app.helpers.models.templates.template import Template

from app.neo4j.neo4jConnection import Neo4jConnection
from app.helpers.notifications.models.notification_model import Notifications, Message


@app.task(name="adding template to DB")
def add_template_custom(url, **notis):

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

    if converted_json.get("error") is not None:
        notifications.messages.append(Message(type="fail", message=converted_json.get("error")))
        notifications = notifications.dict()
        return notifications


    template = Template.parse_obj(converted_json)

    conn = Neo4jConnection()
    status = conn.check()

    if status is False:
        print("database not connected")
        notifications.messages.append(Message(type="fail", message="Could not connect to database"))
        notifications = notifications.dict()
        return notifications

    print("adding template: ", template.Name)
    conn.update_template(template)
    print("adding template finished: ", template.Name)

    notifications.messages.append(
        Message(type="success", message="Template " + "<b>" + template.Name + "</b>" + " successfully written "
                                                                                       "to database"))

    result = {}
    notifications_json = notifications.dict()
    result = notifications_json

    return result


@app.task(name="deleting template")
def delete_template_custom(template_id, **notifications):
    if notifications:
        notifications = Notifications(**notifications)
    else:
        notifications = Notifications(messages=[])
        notifications.is_webhook = False

    notifications = Notifications(**notifications)

    conn = Neo4jConnection()

    conn.delete_template(template_id)

    result = {}
    notifications_json = notifications.dict()
    result["notifications"] = notifications_json


@app.task
def delete_template_all_custom():
    conn = Neo4jConnection()
    conn.delete_template_all()


@app.task(name="build templates from scratch")
def template_build_from_scratch():
    repository_name = os.environ.get("TEMPLATE_REPOSITORY", "nfdi4plants/SWATE_templates")
    branch = "main"

    github_api = GithubAPI(repository_name=repository_name)
    file_list = github_api.get_master_tree(branch).get("tree")

    files = []

    for file in file_list:
        print("ff", file.get("path"))
        if ".xlsx" in file.get("path"):
            files.append(file.get("url"))

    for file in files:
        result = requests.get(file)
        data = json.loads(result.content)
        decoded_content = base64.b64decode(data["content"])

        swate_api = SwateAPI()
        converted_json = swate_api.convert_xslx(decoded_content)

        template = Template.parse_obj(converted_json)

        conn = Neo4jConnection()
        print("adding template: ", template.Name)
        conn.update_template(template)
        print("adding template finished: ", template.Name)
