import obonet
from io import StringIO
import sys
import pandas as pd

from celery.result import AsyncResult
from celery import chain

from fastapi import APIRouter, Body, Depends, HTTPException, status
from app.github.webhook_payload import PushWebhookPayload

from app.tasks.process_ontology import ontology_task
from app.custom.custom_payload import CustomPayload
from app.custom.models.add_ontology import AddOntologyPayload
from app.custom.models.delete_ontology import DeleteOntologyPayload, DeleteOntologyResponse

from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser


from app.helpers.oboparsing.models.term import Term
from app.helpers.oboparsing.models.ontology import Ontology
from app.helpers.oboparsing.models.relationships import Relationships
from app.helpers.oboparsing.models.obo_file import OboFile

from app.tasks.add_external_ontologies import add_extern_task
from app.tasks.delete_ontologies import delete_ontology_task
from app.tasks.add_to_database import write_to_db

from app.tasks.clear_database_task import clear_database_task

from resource import *

router = APIRouter()


@router.delete("/clear", response_model=DeleteOntologyResponse, status_code=status.HTTP_201_CREATED)
async def clear_database():
    print("deleting database")

    result = clear_database_task.delay()

    print("results2", result.get())

    return DeleteOntologyResponse(
        deleted=result.get()
    )