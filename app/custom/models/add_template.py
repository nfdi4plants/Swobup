from typing import Optional, List

from pydantic import BaseModel


class AddTemplatePayload(BaseModel):
    url: Optional[List[str]]


class DeleteTemplatePayload(BaseModel):
    ids: Optional[List[str]]