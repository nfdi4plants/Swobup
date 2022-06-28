from typing import Optional, List, Dict

from pydantic import BaseModel

from app.github.models.commit import Commit
from app.github.models.author import Author
from app.github.models.repository import Repository
from app.github.models.user import User


class PushWebhookPayload(BaseModel):
    ref: Optional[str]
    before: Optional[str]
    after: Optional[str]
    commits: Optional[List[Commit]]
    # commits: Optional[Dict(Commit)]
    pusher: Optional[Author]
    repository: Optional[Repository]
    sender: Optional[User]