from typing import Optional, List
from pydantic import BaseModel, Field

class AddTemplatePayload(BaseModel):
    url: Optional[List[str]] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }

class DeleteTemplatePayload(BaseModel):
    ids: Optional[List[str]] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }