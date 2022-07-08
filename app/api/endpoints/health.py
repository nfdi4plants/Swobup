from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.responses import PlainTextResponse, JSONResponse, HTMLResponse
from app.neo4j.neo4jConnection import Neo4jConnection

router = APIRouter()


@router.get("")
async def status():
    conn = Neo4jConnection(uri="bolt://localhost:7687",
                           user="neo4j",
                           pwd="test")

    db_status = conn.check()
    status = "OK"
    status_code = 200

    if not db_status:
        neo4jconnection = "not conncected"
        status = "degraded"
        status_code = 503
    else:
        neo4jconnection = "connected"
        status_code = 200

    conn.close()

    output = {
        "services": {
            "neo4j": neo4jconnection,
            "swate": "feature not implemented",
            "rabbitmq": "feature not implemented"
        },
        "status": status
    }

    return JSONResponse(output, status_code=status_code)