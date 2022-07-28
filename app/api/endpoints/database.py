import obonet
from io import StringIO
import sys
import pandas as pd
import secrets

from celery.result import AsyncResult
from celery import chain

from fastapi.security import HTTPBasic, HTTPBasicCredentials

from fastapi import APIRouter, Body, Depends, HTTPException, status, Response
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

from app.api.middlewares.http_basic_auth import *

from resource import *

router = APIRouter()


@router.delete("/clear", response_model=DeleteOntologyResponse, status_code=status.HTTP_200_OK,
               summary="Clear database", dependencies=[Depends(basic_auth)])
async def clear_database():
    print("deleting database")

    result = clear_database_task.delay()

    print("results2", result.get())

    return DeleteOntologyResponse(
        deleted=result.get()
    )


@router.put("/init", summary="Initiate database and setting constraints", status_code=status.HTTP_204_NO_CONTENT,
            response_class=Response, dependencies=[Depends(basic_auth)])
async def initiate_db():
    conn = Neo4jConnection(uri="bolt://localhost:7687",
                           user="neo4j",
                           pwd="test")

    conn.set_constraints()

    return Response(status_code=status.HTTP_204_NO_CONTENT)
