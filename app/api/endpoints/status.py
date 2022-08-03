import os

from fastapi import APIRouter, Body, Depends, HTTPException, status, FastAPI
from fastapi.responses import PlainTextResponse, JSONResponse, HTMLResponse, Response
from app.neo4j.neo4jConnection import Neo4jConnection

from app.custom.models.health import Health, Services
from app.custom.models.status import Status

from app.helpers.swate_api import SwateAPI

router = APIRouter()


@router.get("/health", response_model=Health,
            responses={200: {"model": Health}, 503: {"model": Health}},
            status_code=status.HTTP_200_OK,
            summary="Get health status of services",
            )
async def health():

    conn = Neo4jConnection()
    db_status = conn.check()

    swate_version = "none"
    swate_api = SwateAPI()
    swate_version = swate_api.get_swate_version()

    neo4j_connection = None
    status = "OK"
    neo4j_connection = "connected"
    if not db_status:
        neo4j_connection = "not connected"
        status = "degraded"

    if swate_version == "none":

        status = "degraded"
        swate_version = "disconnected"


    return Health(
        services=Services(neo4j=neo4j_connection, swate=swate_version, rabbitmq="feature not implemented"),
        status=status
    )


@router.get("/info", response_model=Status,
            responses={200: {"model": Status}, 503: {}},
            status_code=status.HTTP_200_OK,
            summary="Get database informations",
            )
async def status():
    conn = Neo4jConnection()

    db_status = conn.check()

    if not db_status:
        return Response(status_code=503)

    number_terms = conn.get_number_terms()
    print("# terms", conn.get_number_terms())

    number_ontologies = conn.get_number_ontologies()
    number_templates = conn.get_number_templates()
    number_relations = conn.get_number_relationships()

    db_url = os.getenv("DB_URL")

    return Status(number_terms=number_terms, number_ontologies=number_ontologies, number_templates=number_templates,
                  number_relationships=number_relations, db_url=db_url)
