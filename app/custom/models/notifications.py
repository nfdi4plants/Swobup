from typing import Optional, List

from pydantic import BaseModel


class NotificationPayload(BaseModel):
    mail_address: Optional[str]
