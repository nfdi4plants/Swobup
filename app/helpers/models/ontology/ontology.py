from typing import Optional
from pydantic import BaseModel, Field, field_validator

class Ontology(BaseModel):
    name: Optional[str] = Field(default=None)
    lastUpdated: Optional[str] = Field(default=None)
    author: Optional[str] = Field(default=None)
    version: Optional[str] = Field(default=None)
    generated: Optional[bool] = Field(default=None)
    importedFrom: Optional[str] = Field(default=None)

    @field_validator("name")
    def rewrite_name(cls, value):
        if value:
            value = value.split("/")[-1]
            value = value.split(".")[0]
        return value

    model_config = {
        'validate_assignment': True
    }