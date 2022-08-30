from typing import Optional, Dict, List

from pydantic import BaseModel, validator

from app.github.models.user import User
from app.github.models.author import Author


class Message(BaseModel):
    type: str
    message: str

class Commit(BaseModel):
    commit_hash: Optional[str]
    commit_text: Optional[str]
    commit_url: Optional[str]


class Notifications(BaseModel):
    messages: List[Message]
    project: Optional[str]
    branch: Optional[str]
    # commit: Optional[Commit]
    author: Optional[str]
    email: Optional[str]
    commit_hash: Optional[str]
    commit_text: Optional[str]
    commit_url: Optional[str]
    is_webhook: Optional[bool]

