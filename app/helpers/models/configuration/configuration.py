from typing import Optional
from pydantic import BaseModel, Field


class SwobupConfig(BaseModel):
    username: Optional[str] = Field(default=None)
    password: Optional[str] = Field(default=None)
    origin: Optional[str] = Field(default=None)
    github_secret: Optional[str] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }


class Neo4jConfig(BaseModel):
    username: Optional[str] = Field(default=None)
    password: Optional[str] = Field(default=None)
    url: Optional[str] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }


class SwateConfig(BaseModel):
    api_url: Optional[str] = Field(default=None)
    ssl_verification: Optional[bool] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }


class NotificationConfig(BaseModel):
    sender: Optional[str] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }


class S3Config(BaseModel):
    access_key_id: Optional[str] = Field(default=None)
    secret_access_key: Optional[str] = Field(default=None)
    bucket: Optional[str] = Field(default=None)
    base_path: Optional[str] = Field(default=None)
    endpoint_url: Optional[str] = Field(default=None)
    region: Optional[str] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }


class MailConfig(BaseModel):
    active: Optional[str] = Field(default=None)
    method: Optional[str] = Field(default=None)
    server: Optional[str] = Field(default=None)
    username: Optional[str] = Field(default=None)
    password: Optional[str] = Field(default=None)
    port: Optional[str] = Field(default=None)
    sender: Optional[str] = Field(default=None)
    cc: Optional[str] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }


class Configuration(BaseModel):
    notification: Optional[NotificationConfig] = Field(default=None)
    swobup: Optional[SwobupConfig] = Field(default=None)
    neo4j: Optional[Neo4jConfig] = Field(default=None)
    swate: Optional[SwateConfig] = Field(default=None)
    s3: Optional[S3Config] = Field(default=None)
    mail: Optional[MailConfig] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }
