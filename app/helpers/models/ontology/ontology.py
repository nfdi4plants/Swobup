from typing import Optional

from pydantic import BaseModel, validator

class Ontology(BaseModel):
    name: Optional[str]
    lastUpdated: Optional[str]
    author: Optional[str]
    version: Optional[str]
    generated: Optional[bool]
    importedFrom: Optional[str]

    # @validator("name", "author", "version", "lastUpdated", pre=True)
    # def strip_strings(cls, value):
    #     if value is not None:
    #         return value.strip()
    #     return value

    @validator("name")
    def rewrite_name(cls, value):
        value = value.split("/")[-1]
        value = value.split(".")[0]
        return value
