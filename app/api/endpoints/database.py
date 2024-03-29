from fastapi import APIRouter, Body, Depends, HTTPException, status, Response
from app.custom.models.delete_ontology import DeleteOntologyPayload, DeleteOntologyResponse
from app.tasks.database_tasks import clear_database_task
from app.neo4j.neo4jConnection import Neo4jConnection

from app.api.middlewares.http_basic_auth import *

router = APIRouter()


@router.delete("/clear", response_model=DeleteOntologyResponse, status_code=status.HTTP_200_OK,
               summary="Clear database", dependencies=[Depends(basic_auth)])
async def clear_database():
    print("deleting database")

    result = clear_database_task.delay()
    return DeleteOntologyResponse(
        deleted=result.get()
    )


@router.put("/init", summary="Initiate database and setting constraints", status_code=status.HTTP_204_NO_CONTENT,
            response_class=Response, dependencies=[Depends(basic_auth)])
async def initiate_db():
    conn = Neo4jConnection()
    conn.set_constraints()

    return Response(status_code=status.HTTP_204_NO_CONTENT)
