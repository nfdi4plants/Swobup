from typing import Optional, List
from pydantic import BaseModel, Field
from app.github.models.author import Author

class Commit(BaseModel):
    id: Optional[str] = Field(default=None)
    timestamp: Optional[str] = Field(default=None)
    message: Optional[str] = Field(default=None)
    author: Optional[Author] = Field(default=None)
    url: Optional[str] = Field(default=None)
    distinct: Optional[bool] = Field(default=None)
    added: Optional[List[str]] = Field(default_factory=list)
    modified: Optional[List[str]] = Field(default_factory=list)
    removed: Optional[List[str]] = Field(default_factory=list)

    model_config = {
        'validate_assignment': True
    }