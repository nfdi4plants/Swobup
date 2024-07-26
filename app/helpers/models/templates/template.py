from typing import Optional, Dict, List
from pydantic import BaseModel, Field, field_validator

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
    # LastUpdated: Optional[str] = Field(default=None)
    # TimesUsed: Optional[int] = Field(default=None)

    @field_validator("Id", mode="before")
    def strip_accession(cls, value):
        return value.replace("-", "_") if value is not None else value

    model_config = {
        'validate_assignment': True
    }