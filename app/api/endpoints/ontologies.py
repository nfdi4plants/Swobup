import obonet
from io import StringIO
import sys
import requests
import pandas as pd
import json
import base64

from celery.result import AsyncResult
from celery import chain

from fastapi import APIRouter, Body, Depends, HTTPException, status, Response
from app.github.webhook_payload import PushWebhookPayload

from app.tasks.ontology_tasks import ontology_build_from_scratch

from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser

from app.helpers.models.ontology.term import Term
from app.helpers.models.ontology.ontology import Ontology
from app.helpers.models.ontology.relationships import Relationships
from app.helpers.models.ontology.obo_file import OboFile
from app.github.github_api import GithubAPI
from app.helpers.general_downloader import GeneralDownloader

from app.tasks.ontology_tasks import add_ontology_task
from app.tasks.database_tasks import add_ontologies

from app.custom.models.add_ontology import AddOntologyPayload
from app.custom.models.delete_ontology import DeleteOntologyPayload
from app.tasks.ontology_tasks import delete_ontology_task

from app.api.middlewares.http_basic_auth import *

router = APIRouter()


# @router.put("/build", summary="Build and add ontologies from scratch")
# async def build_from_scratch():
#     result = ontology_build_from_scratch.delay()
#     print("result", result)
#     res = result.get()
#     print("res", res)

@router.put("/build", summary="Build and add ontologies from scratch", status_code=status.HTTP_204_NO_CONTENT,
            response_class=Response, dependencies=[Depends(basic_auth)])
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
                # if "ncbitaxon" in url.decode():
                #     continue
                urls.append(url.decode().strip())

    for url in urls:
        print("url", urls)
        chain(add_ontology_task.s(url), add_ontologies.s()).apply_async()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("", summary="Add ontology by URL",
             status_code=status.HTTP_201_CREATED,
             response_class=Response,
             dependencies=[Depends(basic_auth)])
async def add_ontology(payload: AddOntologyPayload):
    print("sending to celery...")

    bli = payload.url

    # print("before download:", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 / 1024)

    print(bli)

    bla = payload.dict()

    # print("converted tro dict:", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 / 1024)

    print("bla", bla)

    # result = add_extern_task.delay(bla)

    result_ids = []

    for url in payload.url:
        print("current_url", url)
        result = chain(add_ontology_task.s(url), add_ontologies.s()).apply_async()
        result_ids.append(result.id)

    print("res IDS", result_ids)

    return Response(status_code=status.HTTP_201_CREATED)


@router.delete("", summary="Delete ontology by name", status_code=status.HTTP_204_NO_CONTENT,
               response_class=Response,
               dependencies=[Depends(basic_auth)])
async def delete_ontology(payload: DeleteOntologyPayload):
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

    # return payload

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.delete("/clear", summary="Delete all ontologies", status_code=status.HTTP_204_NO_CONTENT,
               response_class=Response,
               dependencies=[Depends(basic_auth)])
async def delete_all_ontologies():
    # result = delete_template_all_custom.delay()
    print("TODO: This has to be implemented")

    return Response(status_code=status.HTTP_204_NO_CONTENT)
