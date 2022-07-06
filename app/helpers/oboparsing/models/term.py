from typing import Optional

from pydantic import BaseModel, ValidationError, validator


class Term(BaseModel):
    accession: Optional[str]
    name: Optional[str]
    definition: Optional[str]
    is_obsolete: Optional[bool]

    # @validator("is_obsolete")
    # def verify_if_bool(cls, value):
    #     print("lower", value)
    #     if value is None:
    #         return
    #     if value.lower() is "true":
    #         print("is true")
    #         return True
    #     if value.lower() is "false":
    #         print("is false")
    #         return False

    @validator("accession")
    def strip_accession(cls, value):
        print("stripping value", value)

        if value is not None:
            print("strip")
            value.strip()
            value.replace('^M','')
        return value

    @validator("name", pre=True)
    def strip_name(cls, value):
        if value is not None:
            value.strip()
            value.replace('^M', '')
        return value

    @validator("definition",  pre=True)
    def strip_definition(cls, value):
        if value is not None:
            value.strip()
            value.replace('^M', '')
        return value