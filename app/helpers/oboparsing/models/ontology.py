from typing import Optional

from pydantic import BaseModel, validator

from app.github.models.user import User
from app.github.models.author import Author


class Ontology(BaseModel):
    name: Optional[str]
    lastUpdated: Optional[str]
    author: Optional[str]
    version: Optional[str]
    generated: Optional[bool]

    @validator("name", "author", "version", "lastUpdated", pre=True)
    def strip_strings(cls, value):
        print("validating... ", value)
        if value is not None:
            return value.strip()
        return value
