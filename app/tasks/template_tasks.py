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

from tasks import app
from app.github.webhook_payload import PushWebhookPayload
from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser

from app.helpers.general_downloader import GeneralDownloader
from app.helpers.swate_api import SwateAPI

from app.helpers.models.templates.template import Template

from app.neo4j.neo4jConnection import Neo4jConnection

from resource import *


@app.task
def add_template_custom(url):
    swate_url = "https://swate.nfdi4plants.de"

    general_downloader = GeneralDownloader(url)
    current_file = general_downloader.retrieve_xslx()

    print("current file", current_file)

    swate_api = SwateAPI()

    converted_json = swate_api.convert_xslx(current_file)

    print("converted_json", converted_json)

    template = Template.parse_obj(converted_json)

    conn = Neo4jConnection()
    # conn.update_template2(template.dict())
    conn.update_template(template)


@app.task
def delete_template_custom(template_id):
    swate_url = "https://swate.nfdi4plants.de"

    conn = Neo4jConnection()

    conn.delete_template(template_id)


@app.task
def delete_template_all_custom():
    swate_url = "https://swate.nfdi4plants.de"

    conn = Neo4jConnection()

    conn.delete_template_all()


@app.task
def template_build_from_scratch():
    # swate_url = "https://swate.nfdi4plants.de"
    #
    # conn = Neo4jConnection(uri="bolt://127.0.0.1:7687",
    #                        user="neo4j",
    #                        pwd="test")
    #
    # conn.delete_template_all()

    repository_name = "nfdi4plants/SWATE_templates"
    branch = "main"

    github_downloader = GitHubDownloader("bla", "blu", "bli")
    res = github_downloader.get_master_tree(repository_name, branch)

    file_list = res.get("tree")

    print("file_list", file_list)

    files = []

    for file in file_list:
        print("ff", file.get("path"))
        if ".xlsx" in file.get("path"):
            files.append(file.get("url"))

    print("file_list", files)
    for file in files:
        result = requests.get(file)
        data = json.loads(result.content)
        print("data", data)
        decoded_content = base64.b64decode(data["content"])
        print("dec", decoded_content)

        swate_api = SwateAPI()
        converted_json = swate_api.convert_xslx(decoded_content)

        print("converted_json", converted_json)

        template = Template.parse_obj(converted_json)

        conn = Neo4jConnection()
        # conn.update_template2(template.dict())
        conn.update_template(template)


