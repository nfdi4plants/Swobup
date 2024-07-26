from typing import Optional, List
from pydantic import BaseModel, Field, field_validator
from app.github.models.user import User
from app.github.models.author import Author


class BuildingType(BaseModel):
    url: str
    type: str


class BuildingObjects(BaseModel):
    files: List[BuildingType] = Field(default_factory=list)

    # original
    # @validator("name", "author", "version", "lastUpdated", pre=True)
    # def strip_strings(cls, value):
    #     if value is not None:
    #         return value.strip()
    #     return value

    # @field_validator("url", "type", mode="before")
    # def strip_strings(cls, value):
    #     if value is not None and isinstance(value, str):
    #         return value.strip()
    #     return value

    model_config = {
        'validate_assignment': True
    }