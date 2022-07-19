from fastapi import APIRouter, Body, Depends, HTTPException, status, FastAPI
from fastapi.responses import PlainTextResponse, JSONResponse, HTMLResponse
from app.neo4j.neo4jConnection import Neo4jConnection

router = APIRouter()


@router.put("/initiate")
async def initiate_db():
    conn = Neo4jConnection(uri="bolt://localhost:7687",
                           user="neo4j",
                           pwd="test")

    conn.set_constraints()

    return JSONResponse(status_code=201, content="bla")
