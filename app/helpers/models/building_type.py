from typing import Optional

from pydantic import BaseModel, validator
from typing import Optional, List, Dict

from app.github.models.user import User
from app.github.models.author import Author


class BuildingType(BaseModel):
    url: str
    type: str

class BuildingObjects(BaseModel):
    files: List[BuildingType] = []


    # @validator("name", "author", "version", "lastUpdated", pre=True)
    # def strip_strings(cls, value):
    #     if value is not None:
    #         return value.strip()
    #     return value