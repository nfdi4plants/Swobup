import pandas as pd
from fastapi import APIRouter, Body, Depends, HTTPException

from app.custom.models.add_template import AddTemplatePayload

router = APIRouter()

@router.post("")
async def add_template(payload: AddTemplatePayload):
    urls = payload.url

    #for url in urls:
        #result = chain(add_template_task.s(url), write_to_db.s())