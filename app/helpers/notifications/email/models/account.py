from pydantic import BaseModel, Field

class Account(BaseModel):
    sender: str = Field(...)
    account_name: str = Field(...)
    password: str = Field(...)
    server_address: str = Field(...)
    port: int = Field(...)

    model_config = {
        'validate_assignment': True
    }