from typing import Optional, List, Dict

from pydantic import BaseModel


class Account(BaseModel):
    sender: str
    account_name: str
    password: str
    server_address: str
    port: int
