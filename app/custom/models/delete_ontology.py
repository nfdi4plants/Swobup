from typing import Optional, List
from pydantic import BaseModel, Field

class DeleteOntologyPayload(BaseModel):
    ontology: Optional[List[str]] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }

class DeleteOntologyResponse(BaseModel):
    deleted: int = Field(default=0)

    model_config = {
        'validate_assignment': True
    }