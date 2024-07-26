from typing import Optional, List
from pydantic import BaseModel, Field

from app.github.models.user import User
from app.github.models.author import Author


class Message(BaseModel):
    type: str
    message: str

    model_config = {
        'validate_assignment': True
    }


class Commit(BaseModel):
    commit_hash: Optional[str] = Field(default=None)
    commit_text: Optional[str] = Field(default=None)
    commit_url: Optional[str] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }


class Notifications(BaseModel):
    messages: List[Message] = Field(default_factory=list)
    project: Optional[str] = Field(default=None)
    branch: Optional[str] = Field(default=None)
    author: Optional[str] = Field(default=None)
    email: Optional[str] = Field(default=None)
    commit_hash: Optional[str] = Field(default=None)
    commit_text: Optional[str] = Field(default=None)
    commit_url: Optional[str] = Field(default=None)
    is_webhook: Optional[bool] = Field(default=None)
    ontology_name: Optional[str] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }