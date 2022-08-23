from typing import Optional, Dict, List

from pydantic import BaseModel, ValidationError, validator


class SwobupConfig(BaseModel):
    username: Optional[str]
    password: Optional[str]
    origin: Optional[str]
    github_secret: Optional[str]


class Neo4jConfig(BaseModel):
    username: Optional[str]
    password: Optional[str]
    url: Optional[str]


class SwateConfig(BaseModel):
    api_url: Optional[str]
    ssl_verification: Optional[bool]


class NotificationConfig(BaseModel):
    sender: Optional[str]


class S3Config(BaseModel):
    access_key_id: Optional[str]
    secret_access_key: Optional[str]
    bucket: Optional[str]
    base_path: Optional[str]
    endpoint_url: Optional[str]
    region: Optional[str]


class Configuration(BaseModel):
    notification: Optional[NotificationConfig]
    swobup: Optional[SwobupConfig]
    neo4j: Optional[Neo4jConfig]
    swate: Optional[SwateConfig]
    s3: Optional[S3Config]
