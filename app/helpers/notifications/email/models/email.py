from pydantic import BaseModel, Field

class Services(BaseModel):
    neo4j: str = Field(default="")
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