from typing import Optional
from pydantic import BaseModel, Field

class Images(BaseModel):
    success: Optional[bool] = Field(default=None)
    warning: Optional[bool] = Field(default=None)
    webhook: Optional[bool] = Field(default=None)

    model_config = {
        'validate_assignment': True
    }