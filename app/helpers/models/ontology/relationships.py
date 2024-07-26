from typing import Optional
from pydantic import BaseModel, Field, field_validator
from app.github.models.user import User
from app.github.models.author import Author

class Relationships(BaseModel):
    node_from: Optional[str] = Field(default=None)
    node_to: Optional[str] = Field(default=None)
    rel_type: Optional[str] = Field(default=None)

    # @field_validator("*", mode="before")
    # def strip_strings(cls, value):
    #     if value is not None and isinstance(value, str):
    #         return value.strip()
    #     return value

    model_config = {
        'validate_assignment': True
    }