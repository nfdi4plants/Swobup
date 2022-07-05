from typing import Optional, List, Dict

from pydantic import BaseModel


class CustomPayload(BaseModel):
    external_ontologies: Optional[List[str]]
