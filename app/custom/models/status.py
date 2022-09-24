from typing import Optional, List, Dict

from pydantic import BaseModel, validator

class MainOntology(BaseModel):
    name: str
    version: str
    lastUpdated: str

    @validator("version", "name", "lastUpdated", pre=True)
    def rewrite_name(cls, value):
        if value is None:
            value = ""
        return value

class Status(BaseModel):
    number_terms: int
    number_ontologies: int
    number_templates: int
    number_relationships: int
    main_ontologies : List[MainOntology]



