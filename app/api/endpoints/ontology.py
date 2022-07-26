import obonet
from io import StringIO
import sys
import requests
import pandas as pd
import json
import base64

from celery.result import AsyncResult
from celery import chain

from fastapi import APIRouter, Body, Depends, HTTPException, status
from app.github.webhook_payload import PushWebhookPayload

from app.tasks.process_ontology import ontology_task
from app.tasks.ontology_tasks import ontology_build_from_scratch

from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser


from app.helpers.models.ontology.term import Term
from app.helpers.models.ontology.ontology import Ontology
from app.helpers.models.ontology.relationships import Relationships
from app.helpers.models.ontology.obo_file import OboFile
from app.github.github_api import GithubAPI
from app.helpers.general_downloader import GeneralDownloader

from app.tasks.add_external_ontologies import add_extern_task
from app.tasks.add_to_database import write_to_db

from app.custom.models.add_ontology import AddOntologyPayload
from app.custom.models.delete_ontology import DeleteOntologyPayload
from app.tasks.delete_ontologies import delete_ontology_task

router = APIRouter()


# @router.put("/build", summary="Build and add ontologies from scratch")
# async def build_from_scratch():
#     result = ontology_build_from_scratch.delay()
#     print("result", result)
#     res = result.get()
#     print("res", res)

@router.put("/build", summary="Build and add ontologies from scratch")
async def build_from_scratch():

    urls = []

    repository_name = "nfdi4plants/nfdi4plants_ontology"
    branch = "main"
    github_api = GithubAPI(repository_name=repository_name, branch=branch)

    tree = github_api.get_master_tree().get("tree")

    print("tree", tree)

    for file in tree:
        current_path = github_api.convert_to_raw_url(file.get("path"))
        if ".obo" in current_path:
            urls.append(current_path)
        if ".testobo" in current_path:
            urls.append(current_path)
        if ".include" in current_path:
            # include_file = requests.get(current_path)
            # data = json.loads(include_file.content)
            # decoded_content = base64.b64decode(data["content"])
            # url_list = decoded_content.decode().splitlines()
            general_downlaoder = GeneralDownloader(current_path)
            url_list = general_downlaoder.download_file()
            for url in url_list:
                if "ncbitaxon" in url.decode():
                    continue
                urls.append(url.decode().strip())

    for url in urls:
        print("url", urls)
        chain(add_extern_task.s(url), write_to_db.s()).apply_async()


@router.delete("")
async def extern(payload: DeleteOntologyPayload):
    urls = payload.url
    ontologies = payload.ontology

    payload = payload.dict()

    print("url", urls)
    print("ontologies", ontologies)

    if urls:
        print("TODO")

    if ontologies:
        print("yes")

    print("payload", payload)

    result = delete_ontology_task.delay(payload)

    return payload


@router.post("")
async def update(payload: PushWebhookPayload):

    print("sending to celery...")

    # ret = chain(ontology_task.s(payload.commits), ontology_task.s(payload.commits)).apply_async()

    # bla = {"bla":"blu"}

    bla = payload.dict()


    result = ontology_task.delay(bla)


    #print("result:", result.get())

    obo_file = result.get()

    print("file", obo_file)


    # obo_model = OboFile.parse_obj(obo_file)

    # print("modell:", obo_file)
    #
    # print(obo_file)

    data = obo_file.get("terms")




    print("results")
    result_df = pd.DataFrame(data)

    result_df.to_csv("output.csv", sep=',')

    relations_df = pd.DataFrame(obo_file.get("relationships"))
    ontologies_df = pd.DataFrame(obo_file.get("ontologies"))

    relations_df.to_csv("output-rel.csv", sep=',')
    ontologies_df.to_csv("output-ont.csv", sep=',')

    # print(result_df)



    # print("in ontology")
    # print("payload", payload)
    # print("respository:", payload.repository)
    # # print("author:", payload.author)
    # print("commits:", payload.commits)
    # print("sender:", payload.sender)
    # print("pusher:", payload.pusher)
    #
    # print("hash: ", payload.after)
    #
    # print("email:", payload.pusher.email)
    #
    #
    #
    # repository_full_name = payload.repository.full_name
    # commit_hash = payload.after
    #
    # commits = payload.commits
    #
    # for commit in commits:
    #     print(commit.modified)
    #     for file in commit.modified:
    #         github_downloader = GitHubDownloader(file, repository_full_name, commit_hash)
    #         current_file = github_downloader.download_file().decode()
    #
    #         # print(current_file)
    #
    #         ontology_buffer = StringIO(current_file)
    #
    #         print(ontology_buffer)
    #
    #         # graph = obonet.read_obo(ontology_buffer)
    #
    #         obo_parser = OBO_Parser(ontology_buffer)
    #
    #         data = obo_parser.parse()
    #
    #         df = pd.DataFrame(data)
    #
    #         print(df)
    #
    #         df.to_csv("output.csv", sep=',')


    # github_downloader = GitHubDownloader()



