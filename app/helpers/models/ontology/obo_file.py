from typing import Optional, List
from pydantic import BaseModel, Field
from app.helpers.models.ontology.term import Term
from app.helpers.models.ontology.relationships import Relationships
from app.helpers.models.ontology.ontology import Ontology


class OboFile(BaseModel):
    terms: Optional[List[Term]] = Field(default_factory=list)
    relationships: Optional[List[Relationships]] = Field(default_factory=list)
    ontologies: Optional[List[Ontology]] = Field(default_factory=list)

    model_config = {
        'validate_assignment': True
    }