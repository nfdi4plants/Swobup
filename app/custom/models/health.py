from typing import Optional, List, Dict
from pydantic import BaseModel, Field

class Neo4j(BaseModel):
    status: str = Field(default="")
    version: str = Field(default="")

    model_config = {
        'validate_assignment': True
    }

class Services(BaseModel):
    neo4j: Neo4j
    swate: str = Field(default="")
    rabbitmq: str = Field(default="")

    model_config = {
        'validate_assignment': True
    }

class Health(BaseModel):
    services: Services
    status: str = Field(default="")

    model_config = {
        'validate_assignment': True
    }