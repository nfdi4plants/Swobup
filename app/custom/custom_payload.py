from typing import Optional, List, Dict

from pydantic import BaseModel


class CustomPayload(BaseModel):
    url: Optional[List[str]]
    ontology: Optional[List[str]]

