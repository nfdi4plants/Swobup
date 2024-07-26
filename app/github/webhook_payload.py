from typing import Optional, List
from pydantic import BaseModel, Field

from app.github.models.commit import Commit
from app.github.models.author import Author
from app.github.models.repository import Repository
from app.github.models.user import User

class PushWebhookPayload(BaseModel):
    ref: Optional[str] = Field(default=None)
    before: Optional[str] = Field(default=None)
    after: Optional[str] = Field(default=None)
    commits: Optional[List[Commit]] = Field(default_factory=list)
    pusher: Optional[Author] = Field(default=None)
    repository: Optional[Repository] = Field(default=None)
    sender: Optional[User] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }