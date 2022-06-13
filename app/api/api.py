from fastapi import APIRouter

from app.api.endpoints import ping
#from endpoints import ping

api_router = APIRouter()
api_router.include_router(ping.router, prefix="/ping", tags=["ping"])
# api_router.include_router(ping.router, prefix="/ping2")
