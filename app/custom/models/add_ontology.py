from typing import Optional, List

from pydantic import BaseModel


class AddOntologyPayload(BaseModel):
    url: Optional[List[str]]
