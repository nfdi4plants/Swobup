from typing import Optional, List, Dict

from pydantic import BaseModel


class Images(BaseModel):
    success: Optional[bool]
    warning: Optional[bool]
    webhook: Optional[bool]
