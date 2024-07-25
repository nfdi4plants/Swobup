from fastapi import APIRouter

from app.api.endpoints import status
from app.api.endpoints import templates
from app.api.endpoints import database
from app.api.endpoints import ontologies
from app.api.endpoints import webhooks
from app.api.endpoints import notifications
# from app.api.endpoints import search
from app.api.endpoints import activity_database

api_router = APIRouter(prefix="/api/v2")

api_router.include_router(status.router, prefix="/status", tags=["Status"])
api_router.include_router(webhooks.router, prefix="/webhook", tags=["Webhooks"])
api_router.include_router(ontologies.router, prefix="/ontology", tags=["Ontologies"])
api_router.include_router(templates.router, prefix="/template", tags=["Templates"])
api_router.include_router(database.router, prefix="/database", tags=["Database"])
api_router.include_router(notifications.router, prefix="/notification", tags=["Notifications"])
# api_router.include_router(search.router, prefix="/search", tags=["Search"])
api_router.include_router(activity_database.router, prefix="/activities", tags=["Activities"])
