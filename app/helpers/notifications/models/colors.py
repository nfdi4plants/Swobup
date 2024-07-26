from typing import Optional, Dict, List
from pydantic import BaseModel, Field

from app.github.models.user import User
from app.github.models.author import Author


class Warning(BaseModel):
    primary_color: str = Field(default="#F2D2D7")
    secondary_color: str = Field(default="#c21f3a")
    font_color: str = Field(default="#871528")
    text: str = Field(default="Job failed")

    model_config = {
        'validate_assignment': True
    }


class Success(BaseModel):
    primary_color: str = Field(default="#d2f3ed")
    secondary_color: str = Field(default="#168875")
    font_color: str = Field(default="#168875")
    text: str = Field(default="Job successful")

    model_config = {
        'validate_assignment': True
    }


class Colors(BaseModel):
    headline: str = Field(default="#ffc000")
    line_color_blue: str = Field(default="#4caed3")
    line_color_yellow: str = Field(default="#ffc000")

    model_config = {
        'validate_assignment': True
    }


class ActivityColors(BaseModel):
    webhook_color: str = Field(default="#2d3e50")
    add_template_color: str = Field(default="#4caed3")
    add_ontology_color: str = Field(default="#168875")
    delete_color: str = Field(default="#c21f3a")
    init_db_color: str = Field(default="#cc9a00")
    build_color: str = Field(default="#ffc000")

    model_config = {
        'validate_assignment': True
    }