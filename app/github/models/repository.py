from typing import Optional

from pydantic import BaseModel

from app.github.models.user import User
from app.github.models.author import Author


class Repository(BaseModel):
    id: Optional[int]
    node_id: Optional[str]
    name: Optional[str]
    full_name: Optional[str]
    html_url: Optional[str]
    stargazers_count: int
    watchers_count: int
    language: Optional[str]
    private: Optional[bool]
    owner: Optional[User]
    default_branch: Optional[str]
    ref: Optional[str]