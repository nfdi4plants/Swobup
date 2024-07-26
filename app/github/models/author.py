from typing import Optional
from pydantic import BaseModel, Field

class Author(BaseModel):
    name: Optional[str] = Field(default=None)
    email: Optional[str] = Field(default=None)
    username: Optional[str] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }