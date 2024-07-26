from typing import Optional, List
from pydantic import BaseModel, Field

class AddOntologyPayload(BaseModel):
    url: Optional[List[str]] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }