from typing import Optional, Dict, List

from pydantic import BaseModel, validator

from app.github.models.user import User
from app.github.models.author import Author


class Warning(BaseModel):
    primary_color: str = "#c21f3a"
    secondary_color: str = "#F2D2D7"
    font_color: str = "#871528"


class Success(BaseModel):
    primary_color: str = "#a2b975"
    secondary_color: str = "#d2e2b4"
    font_color: str = "#6c7c4e"

class Colors(BaseModel):
    success: Success
    warning: Warning
