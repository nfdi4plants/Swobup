import obonet
from io import StringIO
import sys
import pandas as pd

from celery.result import AsyncResult
from celery import chain

from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.responses import PlainTextResponse, JSONResponse, HTMLResponse
from app.github.webhook_payload import PushWebhookPayload

from app.custom.custom_payload import CustomPayload
from app.custom.models.add_ontology import AddOntologyPayload
from app.custom.models.delete_ontology import DeleteOntologyPayload, DeleteOntologyResponse

from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser

from app.tasks.database_tasks import add_ontologies

from app.tasks.database_tasks import clear_database_task
from app.neo4j.neo4jConnection import Neo4jConnection

from resource import *

router = APIRouter()


@router.delete("/clear", response_model=DeleteOntologyResponse, status_code=status.HTTP_201_CREATED,
               summary="Clear database")
async def clear_database():
    print("deleting database")

    result = clear_database_task.delay()

    print("results2", result.get())

    return DeleteOntologyResponse(
        deleted=result.get()
    )


@router.put("/init", summary="Initiate database and setting constraints")
async def initiate_db():
    conn = Neo4jConnection(uri="bolt://localhost:7687",
                           user="neo4j",
                           pwd="test")

    conn.set_constraints()

    return JSONResponse(status_code=201, content="bla")
