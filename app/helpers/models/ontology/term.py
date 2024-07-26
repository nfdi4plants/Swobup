from typing import Optional
from pydantic import BaseModel, Field, field_validator

class Term(BaseModel):
    accession: Optional[str] = Field(default=None)
    name: Optional[str] = Field(default=None)
    definition: Optional[str] = Field(default=None)
    is_obsolete: Optional[bool] = Field(default=None)
    ontology_origin: Optional[str] = Field(default=None)

    # @field_validator("accession", "name", "definition", "ontology_origin", mode="before")
    # def strip_accession(cls, value):
    #     if value is not None:
    #         return value.strip()
    #     return value
    #
    # @field_validator("is_obsolete", mode="before")
    # def check_bool(cls, value):
    #     if isinstance(value, str):
    #         value = value.strip().lower()
    #         if value in ["true", "1"]:
    #             return True
    #         elif value in ["false", "0"]:
    #             return False
    #     return value

    model_config = {
        'validate_assignment': True
    }