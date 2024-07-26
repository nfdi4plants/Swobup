from typing import Optional, List
from pydantic import BaseModel, Field

class CustomPayload(BaseModel):
    url: Optional[List[str]] = Field(default=None)
    ontology: Optional[List[str]] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }