import pandas as pd

from celery.result import AsyncResult

from fastapi import APIRouter, Body, Depends, HTTPException

from app.custom.models.add_template import AddTemplatePayload

from app.tasks.template_tasks import add_template_custom

router = APIRouter()

@router.post("")
async def add_template(payload: AddTemplatePayload):
    urls = payload.url

    #for url in urls:
        #result = chain(add_template_task.s(url), write_to_db.s())

    for url in urls:
        result = add_template_custom.delay(url)
        print("result", result)

@router.delete("")
async def delete_template(payload: AddTemplatePayload):
    pass