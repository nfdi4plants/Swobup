from fastapi import APIRouter

from app.api.endpoints import ping
from app.api.endpoints import health
from app.api.endpoints import ontology

from app.api.endpoints import add_ext_ontology
from app.api.endpoints import clean_database
from app.api.endpoints import initiate_database

#from endpoints import ping

api_router = APIRouter()
api_router.include_router(ping.router, prefix="/ping", tags=["ping"])
# api_router.include_router(ping.router, prefix="/ping2")

api_router.include_router(health.router, prefix="/health", tags=["Status"])
api_router.include_router(ontology.router, prefix="/ontology", tags=["Custom"])
api_router.include_router(add_ext_ontology.router, prefix="/add_extern", tags=["Custom"])
api_router.include_router(clean_database.router, prefix="/setup", tags=["setup"])
api_router.include_router(add_ext_ontology.router, prefix="/setup", tags=["setup"])
api_router.include_router(initiate_database.router, prefix="/setup", tags=["setup"])
