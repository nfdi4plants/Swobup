from typing import Optional, List, Dict

from pydantic import BaseModel

class MainOntology(BaseModel):
    name: str
    version: str
    lastUpdated: str

class Status(BaseModel):
    number_terms: int
    number_ontologies: int
    number_templates: int
    number_relationships: int
    main_ontologies : List[MainOntology]
