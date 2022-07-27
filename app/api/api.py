from fastapi import APIRouter

from app.api.endpoints import status
from app.api.endpoints import templates
from app.api.endpoints import database
from app.api.endpoints import ontologies
from app.api.endpoints import webhooks

api_router = APIRouter(prefix="/api/v2")

api_router.include_router(status.router, prefix="/health", tags=["Status"])
api_router.include_router(webhooks.router, prefix="/webhook", tags=["Webhooks"])
api_router.include_router(ontologies.router, prefix="/ontology", tags=["Ontologies"])
api_router.include_router(templates.router, prefix="/template", tags=["Templates"])
api_router.include_router(database.router, prefix="/database", tags=["Database"])
