from typing import Optional, List, Dict

from pydantic import BaseModel


class Services(BaseModel):
    neo4j: str
    swate: str
    rabbitmq: str


class Health(BaseModel):
    services:Services
    status: str
