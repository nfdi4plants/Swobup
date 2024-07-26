from typing import Optional
from pydantic import BaseModel, Field

class NotificationPayload(BaseModel):
    mail_address: Optional[str] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }