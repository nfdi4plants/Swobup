from fastapi import APIRouter

from app.api.endpoints import ping
from app.api.endpoints import health
from app.api.endpoints import ontology

from app.api.endpoints import add_ext_ontology
#from endpoints import ping

api_router = APIRouter()
api_router.include_router(ping.router, prefix="/ping", tags=["ping"])
# api_router.include_router(ping.router, prefix="/ping2")

api_router.include_router(health.router, prefix="/health")
api_router.include_router(ontology.router, prefix="/ontology")
api_router.include_router(add_ext_ontology.router, prefix="/add_extern")
