from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api import api_router
from fastapi.staticfiles import StaticFiles


from multiprocessing.managers import SyncManager
from UltraDict import UltraDict
from typing import Any, Dict, Optional, Union, List

from aiocache import Cache


class Meta:
    def __init__(self, **kwargs: List[Any]):
        self.ultradict = UltraDict(name='fastapi_dict')
        self.ultradict.update(**kwargs)

    def increase_one(self, key: str):
        self.ultradict.update([(key, self.ultradict.get(key) + 1)])

    def reset(self, key: str):
        self.ultradict.update([(key, 0)])

    def report(self, item: Union[str, int]):
        return self.ultradict.get(item)

    def update_invertedList(self, invertedList):
        self.ultradict.update(invertedList)


    def get_invertedList(self, invertedList):
        return self.ultradict.get(invertedList)

app = FastAPI()


# example:
# https://github.com/tiangolo/full-stack-fastapi-postgresql/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/backend/app/app/main.py

invertedList = []

origins = [
    "https://swobup.nfdi4plants.org",
]

# origins = [
#     "[*]",
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

app.include_router(api_router)

app.mount("/", StaticFiles(directory="app/html/static", html = True), name="static")