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

from resource import *

from app.tasks.database_tasks import add_ontologies

from celery.backends.s3 import S3Backend

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
            if "ncbitaxon" in url:
                continue
            result = chain(add_ontology.s(url), add_ontologies.s()).apply_async()
            print("resutl", result)





        # return data

# old task
@app.task
def ontology_build_from_scratch():
    # swate_url = "https://swate.nfdi4plants.de"
    #
    # conn = Neo4jConnection(uri="bolt://127.0.0.1:7687",
    #                        user="neo4j",
    #                        pwd="test")
    #
    # conn.delete_template_all()

    repository_name = "nfdi4plants/nfdi4plants_ontology"
    branch = "main"

    github_downloader = GitHubDownloader("bla", "blu", "bli")
    res = github_downloader.get_master_tree(repository_name, branch)

    file_list = res.get("tree")

    print("file_list", file_list)

    files = []

    building_objects = BuildingObjects()


    for file in file_list:
        print("ff", file.get("path"))
        if ".obo" in file.get("path"):
            # files.append(file.get("url"))
            building_type = BuildingType(url=file.get("url"), type="obo")
            building_objects.files.append(building_type)
        if ".testobo" in file.get("path"):
            # files.append(file.get("url"))
            building_type = BuildingType(url=file.get("url"), type="obo")
            building_objects.files.append(building_type)
        if ".include" in file.get("path"):
            # files.append(file.get("url"))
            building_type = BuildingType(url=file.get("url"), type="include")
            building_objects.files.append(building_type)

    # ret = chain(ontology_task.s(payload.commits), ontology_task.s(payload.commits)).apply_async()

    print("ggg", building_objects.dict().get("files"))

    for build_type in building_objects.dict().get("files"):
        print("file is", build_type)
        result = add_ontology_from_scratch.delay(build_type)

    print("finished", result)


@app.task
def delete_ontology_task(payload):

    conn = Neo4jConnection(uri="bolt://127.0.0.1:7687",
                           user="neo4j",
                           pwd="test")

    print("payload", payload)

    if payload.get("url"):
        print("url is available")

    if payload.get("ontology"):
        print("ontologies were given")
        for ontology_name in payload.get("ontology"):
            conn.delete_ontology(ontology_name)


@app.task(bind=True)
def add_ontology_task(self, url):
    general_downloader = GeneralDownloader(url)
    current_file = general_downloader.download_file()

    # print("after download:", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 / 1024)

    # ontology_buffer = StringIO(current_file)

    ontology_buffer = io.TextIOWrapper(current_file, newline=None)

    obo_parser = OBO_Parser(ontology_buffer)
    data = obo_parser.parse()
    print("parsing finished")

    # print("end of", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 /1024)

    # print("ID", celery.result.AsyncResult.result)
    # print("task_id", self.request.id)
    #
    # s3_storage = S3Storage()
    #
    # s3_storage.download_one_file(self.request.id)

    backend = S3Backend(app=app)

    s3_key = backend.get_key_for_task(self.request.id).decode()
    s3_key = str(s3_key)+"-results"
    print("s3_key", s3_key)
    backend.set(key=s3_key, value=json.dumps(data))


    res = {"task_id": str(s3_key)}

    print("s3 uploaded...")

    return res

@app.task
def delete_ontology_task(payload):

    conn = Neo4jConnection(uri="bolt://127.0.0.1:7687",
                           user="neo4j",
                           pwd="test")

    print("payload", payload)

    if payload.get("url"):
        print("url is available")

    if payload.get("ontology"):
        print("ontologies were given")
        for ontology_name in payload.get("ontology"):
            conn.delete_ontology(ontology_name)


# is this needed ?
@app.task
def ontology_task_temp(payload):

    print("payload", payload)

    print("commits")
    print(payload.get("commits"))

    commits = payload.get("commits")
    repository_full_name = payload.get("repository").get("full_name")
    commit_hash = payload.get("after")

    print(repository_full_name)
    print(commit_hash)

    # repository_full_name = payload.repository.full_name
    # commit_hash = payload.after

    for commit in commits:
        print("commit", commit)
        # print(commit.modified)
        for file in commit.get("modified"):
            github_downloader = GitHubDownloader(file, repository_full_name, commit_hash)
            current_file = github_downloader.download_file().decode()

            ontology_buffer = StringIO(current_file)

            # graph = obonet.read_obo(ontology_buffer)

            obo_parser = OBO_Parser(ontology_buffer)


            data = obo_parser.parse()

            # df = pd.DataFrame(data.get("terms"))

            print(data)

            #df.to_csv("output.csv", sep=',')#


    return data