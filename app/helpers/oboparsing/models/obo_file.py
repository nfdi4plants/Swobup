from typing import Optional, List, Dict

from pydantic import BaseModel

from app.helpers.oboparsing.models.term import Term
from app.helpers.oboparsing.models.relationships import Relationships
from app.helpers.oboparsing.models.ontology import Ontology


class OboFile(BaseModel):
    terms: Optional[List[Term]]
    relationships: Optional[List[Relationships]]
    ontologies: Optional[List[Ontology]]
