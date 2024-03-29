from fastapi import APIRouter, Body, Depends, HTTPException, status, Response

from app.custom.models.add_template import AddTemplatePayload, DeleteTemplatePayload

from app.tasks.template_tasks import  delete_template_custom, delete_template_all_custom, \
    template_build_from_scratch, add_templates

from app.api.middlewares.http_basic_auth import *

router = APIRouter()


@router.post("", summary="Add specific template by url", status_code=status.HTTP_204_NO_CONTENT,
             response_class=Response, dependencies=[Depends(basic_auth)])
async def add_template(payload: AddTemplatePayload):
    urls = payload.url

    # for url in urls:
    # result = chain(add_template_task.s(url), write_to_db.s())

    for url in urls:
        # result = add_template_custom.delay(url)
        result = add_templates.delay(url)
        print("result", result)

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.delete("", summary="Delete specific template by id", status_code=status.HTTP_204_NO_CONTENT,
               response_class=Response, dependencies=[Depends(basic_auth)])
async def delete_template(payload: DeleteTemplatePayload):
    ids = payload.ids

    print("ids", ids)

    for id in ids:
        # result = delete_template_custom.delay(id)
        result = delete_template_custom.delay(id)
        print("result", result)

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.delete("/clear", summary="Clear database and delete all templates", status_code=status.HTTP_204_NO_CONTENT,
               response_class=Response, dependencies=[Depends(basic_auth)])
async def delete_all_templates():
    result = delete_template_all_custom.delay()
    # chain(delete_template_all_custom.s(notifications_json), send_webhook_mail.s()).apply_async()
    print("result", result)

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/build", summary="Build and add templates from scratch", status_code=status.HTTP_204_NO_CONTENT,
            response_class=Response, dependencies=[Depends(basic_auth)])
async def build_from_scratch():
    result = template_build_from_scratch.delay()
    print("result", result)

    return Response(status_code=status.HTTP_204_NO_CONTENT)
