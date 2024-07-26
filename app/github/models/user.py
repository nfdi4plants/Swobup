from typing import Optional
from pydantic import BaseModel, Field

class User(BaseModel):
    login: Optional[str] = Field(default=None)
    name: Optional[str] = Field(default=None)
    email: Optional[str] = Field(default=None)
    id: Optional[int] = Field(default=None)
    html_url: Optional[str] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }
