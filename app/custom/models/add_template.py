from typing import Optional, List

from pydantic import BaseModel


class AddTemplatePayload(BaseModel):
    url: Optional[List[str]]