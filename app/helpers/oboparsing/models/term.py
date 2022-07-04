from typing import Optional

from pydantic import BaseModel


class Term(BaseModel):
    accession: Optional[str]
    name: Optional[str]
    definition: Optional[str]
    is_obsolete: Optional[bool]