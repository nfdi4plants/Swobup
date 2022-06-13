from fastapi import FastAPI, APIRouter, Depends, HTTPException, Request

from fastapi.middleware.cors import CORSMiddleware

from app.api.api import api_router


app = FastAPI()

#example:
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

app.include_router(api_router)

# @app.get("/")
# async def root():
#     return {"message": "Hello World"}



# @app.get("/ping")
# def ping():
#     return {"message": "pong"}