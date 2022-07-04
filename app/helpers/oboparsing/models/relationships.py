from typing import Optional

from pydantic import BaseModel

from app.github.models.user import User
from app.github.models.author import Author


class Relationships(BaseModel):
    node_from: Optional[str]
    node_to: Optional[str]
    rel_type: Optional[str]