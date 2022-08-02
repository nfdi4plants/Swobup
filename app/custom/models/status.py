from typing import Optional, List, Dict

from pydantic import BaseModel


class Status(BaseModel):
    number_terms: int
    number_ontologies: int
    number_templates: int
    number_relationships: int
    db_url : str
