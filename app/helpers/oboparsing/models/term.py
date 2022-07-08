from typing import Optional

from pydantic import BaseModel, ValidationError, validator


class Term(BaseModel):
    accession: Optional[str]
    name: Optional[str]
    definition: Optional[str]
    is_obsolete: Optional[bool]
    ontology_origin: Optional[str]

    # @validator("accession", "name", "definition", "ontology_origin", pre=True)
    # def strip_accession(cls, value):
    #     if value is not None:
    #         return value.strip()
    #     return value

    @validator("is_obsolete", pre=True)
    def check_bool(cls, value):
        if value is None:
            return
        if isinstance(value, str):
            value = value.strip()
            if value.lower() == "true":
                return True
            elif value.lower() is "false":
                return False
        return value
