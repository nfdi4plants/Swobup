from typing import Optional, List
from pydantic import BaseModel, Field, validator

class MainOntology(BaseModel):
    name: str = Field(default="")
    version: str = Field(default="")
    lastUpdated: str = Field(default="")

    @validator("version", "name", "lastUpdated", pre=True, always=True)
    def rewrite_name(cls, value):
        if value is None:
            value = ""
        return value

    model_config = {
        'validate_assignment': True
    }

class Status(BaseModel):
    number_terms: int
    number_ontologies: int
    number_templates: int
    number_relationships: int
    main_ontologies: List[MainOntology]

    model_config = {
        'validate_assignment': True
    }