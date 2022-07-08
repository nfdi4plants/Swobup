from typing import Optional

from pydantic import BaseModel, validator

from app.github.models.user import User
from app.github.models.author import Author


class Relationships(BaseModel):
    node_from: Optional[str]
    node_to: Optional[str]
    rel_type: Optional[str]


    # @validator("*", pre=True)
    # def strip_strings(cls, value):
    #     if value is not None:
    #         return value.strip()
    #     return value