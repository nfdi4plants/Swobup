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

from app.tasks.ontology_tasks import ontology_webhoook_task
from app.tasks.ontology_tasks import ontology_build_from_scratch

from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser


from app.helpers.models.ontology.term import Term
from app.helpers.models.ontology.ontology import Ontology
from app.helpers.models.ontology.relationships import Relationships
from app.helpers.models.ontology.obo_file import OboFile
from app.github.github_api import GithubAPI
from app.helpers.general_downloader import GeneralDownloader

from app.tasks.database_tasks import add_ontologies

from app.custom.models.add_ontology import AddOntologyPayload
from app.custom.models.delete_ontology import DeleteOntologyPayload

router = APIRouter()


@router.post("/ontology", summary="Ontology Webhook", status_code=status.HTTP_204_NO_CONTENT,
             response_class=Response)
async def ontology(payload: PushWebhookPayload):

    print("sending to celery...")

    # ret = chain(ontology_task.s(payload.commits), ontology_task.s(payload.commits)).apply_async()

    # bla = {"bla":"blu"}

    payload_dictionary = payload


    # print("pay", payload_dictionary)

    print("payload", payload.dict())

    # commits = payload.commits.pop()
    #
    # modified = commits.modified
    # added = commits.added
    # removed = commits.removed
    #
    # print("1", modified)
    # print(added)
    # print(removed)

    # update_files = modified + added


    #
    # for file in update_files:
    #     if ".obo" in file:

    return Response(status_code=status.HTTP_204_NO_CONTENT)






