import obonet
from io import StringIO
import sys
import pandas as pd
import secrets

from celery.result import AsyncResult
from celery import chain

from fastapi.security import HTTPBasic, HTTPBasicCredentials

from fastapi import APIRouter, Body, Depends, HTTPException, status, Response

from app.neo4j.neo4jConnection import Neo4jConnection

from app.api.middlewares.http_basic_auth import *

from resource import *

router = APIRouter()


@router.post("/send", summary="Create Swobup Mail", status_code=status.HTTP_204_NO_CONTENT,
            response_class=Response, dependencies=[Depends(basic_auth)])
async def send_mail():

    print("no content")

    return Response(status_code=status.HTTP_204_NO_CONTENT)