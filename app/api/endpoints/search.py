import obonet
from io import StringIO
import sys
import requests
import pandas as pd
import json
import base64

from celery.result import AsyncResult
from celery import chain

from fastapi import APIRouter, Body, Depends, HTTPException, status, Response, Request
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
from app.tasks.database_tasks import update_ontologies

from app.custom.models.add_ontology import AddOntologyPayload
from app.custom.models.delete_ontology import DeleteOntologyPayload

from app.api.middlewares.github_authentication import *

from app.tasks.ontology_tasks import add_ontology_task
from app.tasks.database_tasks import update_ontologies

from app.tasks.template_tasks import add_template_custom, delete_template_custom, delete_template_all_custom, \
    template_build_from_scratch

from app.github.github_api import GithubAPI

from app.neo4j.neo4jConnection import Neo4jConnection

router = APIRouter()



# ,  dependencies=[Depends(github_authentication)]

# global invertedList

@router.post("bla", summary="Template Webhook", status_code=status.HTTP_200_OK,
             response_class=Response)
async def template(request: Request):

    test = "bla"




    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/init", summary="Template Webhook", status_code=status.HTTP_200_OK,
             response_class=Response)
async def template(request: Request):



    return Response(status_code=status.HTTP_204_NO_CONTENT)