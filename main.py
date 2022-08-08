from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api import api_router
from fastapi.staticfiles import StaticFiles


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