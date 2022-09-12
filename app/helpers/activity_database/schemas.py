from pydantic import BaseModel
import datetime


class ItemBase(BaseModel):
    title: str
    description: str | None = None


class ActivityBase(BaseModel):
    message: str
    timestamp: str
    color: str

class Activity(ActivityBase):
    class Config:
        orm_mode = True



class ActivityCreate(ActivityBase):
    timestamp: str = datetime.datetime.now()


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    items: list[Item] = []

    class Config:
        orm_mode = True
