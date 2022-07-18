from typing import Optional, List, Dict

from pydantic import BaseModel

from app.helpers.models.ontology.term import Term
from app.helpers.models.ontology.relationships import Relationships
from app.helpers.models.ontology.ontology import Ontology


class OboFile(BaseModel):
    terms: Optional[List[Term]] = []
    relationships: Optional[List[Relationships]] = []
    ontologies: Optional[List[Ontology]] = []
