from fastapi import FastAPI, APIRouter, Depends, HTTPException, Request

from fastapi.middleware.cors import CORSMiddleware

from app.api.api import api_router

# from app.middlewares.require_json import Require_JSON
from starlette.middleware.base import BaseHTTPMiddleware

import time

app = FastAPI()

# requireJSON_middleware = Require_JSON()


# example:
# https://github.com/tiangolo/full-stack-fastapi-postgresql/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/backend/app/app/main.py


@app.middleware("http")
async def add_version_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Version"] = "v1.2.10"
    return response


origins = [
    "http://bla.com:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


# app.add_middleware(BaseHTTPMiddleware, dispatch=requireJSON_middleware)

app.include_router(api_router)

# @app.get("/")
# async def root():
#     return {"message": "Hello World"}


# @app.get("/ping")
# def ping():
#     return {"message": "pong"}
