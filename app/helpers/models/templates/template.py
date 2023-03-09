from typing import Optional , Dict, List

from pydantic import BaseModel, validator

from app.github.models.user import User
from app.github.models.author import Author


class Template(BaseModel):
    Id: str
    Name: str
    Description: str
    Organisation: str
    Version: str
    TemplateJson: str
    Authors: List[Dict]
    Tags: List[Dict]
    ER: List[Dict]
    # LastUpdated: str
    # TimesUsed: int

    @validator("Id", pre=True)
    def strip_accession(cls, value):
        value = value.replace("-", "_")
        return value