from typing import Optional, List

from pydantic import BaseModel


class DeleteOntologyPayload(BaseModel):
    ontology: Optional[List[str]]


class DeleteOntologyResponse(BaseModel):
    deleted: int
