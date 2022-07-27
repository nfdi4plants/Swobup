from fastapi import APIRouter, Body, Depends, HTTPException, status, FastAPI
from fastapi.responses import PlainTextResponse, JSONResponse, HTMLResponse
from app.neo4j.neo4jConnection import Neo4jConnection

from app.custom.models.health import Health, Services

router = APIRouter()


@router.get("", response_model=Health, responses={200: {"model": Health}, 503: {"model": Health}},
            status_code=status.HTTP_200_OK)
async def status():
    conn = Neo4jConnection(uri="bolt://localhost:7687",
                           user="neo4j",
                           pwd="test")

    db_status = conn.check()
    # status = "OK"
    # status_code = 200
    #
    # if not db_status:
    #     neo4jconnection = "not conncected"
    #     status = "degraded"
    #     status_code = 503
    # else:
    #     neo4jconnection = "connected"
    #     status_code = 200
    #
    # conn.close()
    #
    # output = {
    #     "services": {
    #         "neo4j": neo4jconnection,
    #         "swate": "feature not implemented",
    #         "rabbitmq": "feature not implemented"
    #     },
    #     "status": status
    # }
    #
    # return JSONResponse(output, status_code=status_code)

    neo4j_connection = None
    status = "OK"
    if not db_status:
        neo4j_connection = "not connected"
        status = "degraded"
        # raise HTTPException(status_code=503,
        #                     detail=Health(services=
        #                                   Services(neo4j=neo4j_connection,
        #                                            swate="feature not implemented",
        #                                            rabbitmq="feature not impemented"),
        #                                   status=status).dict())
        return JSONResponse(status_code=503, content=Health(services=
                                                            Services(neo4j=neo4j_connection,
                                                                     swate="feature not implemented",
                                                                     rabbitmq="feature not impemented"),
                                                            status=status).dict())

    else:
        neo4j_connection = "connected"
        status = "OK"

    return Health(
        services=Services(neo4j=neo4j_connection, swate="feature not implemented", rabbitmq="feature not impemented"),
        status=status
    )
