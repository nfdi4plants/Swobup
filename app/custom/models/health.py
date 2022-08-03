from typing import Optional, List, Dict

from pydantic import BaseModel

class Neo4j(BaseModel):
    status: str
    version: str

class Services(BaseModel):
    neo4j: Neo4j
    swate: str
    rabbitmq: str


class Health(BaseModel):
    services: Services
    status: str
