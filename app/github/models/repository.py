from typing import Optional
from pydantic import BaseModel, Field
from app.github.models.user import User
from app.github.models.author import Author

class Repository(BaseModel):
    id: Optional[int] = Field(default=None)
    node_id: Optional[str] = Field(default=None)
    name: Optional[str] = Field(default=None)
    full_name: Optional[str] = Field(default=None)
    html_url: Optional[str] = Field(default=None)
    stargazers_count: int = Field(default=0)
    watchers_count: int = Field(default=0)
    language: Optional[str] = Field(default=None)
    private: Optional[bool] = Field(default=None)
    owner: Optional[User] = Field(default=None)
    default_branch: Optional[str] = Field(default=None)
    ref: Optional[str] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }