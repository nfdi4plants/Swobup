from typing import Optional

from pydantic import BaseModel

from app.github.models.user import User
from app.github.models.author import Author


class Ontology(BaseModel):
    name: Optional[str]
    lastUpdated: Optional[str]
    author: Optional[str]
    version: Optional[str]
    generated: Optional[bool]