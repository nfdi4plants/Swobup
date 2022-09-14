from pydantic import BaseModel
import datetime


class ActivityBase(BaseModel):
    message: str
    # timestamp: str
    color: str


class Activity(ActivityBase):
    class Config:
        orm_mode = True


class ActivityCreate(ActivityBase):
    timestamp: str = datetime.datetime.now()
