from fastapi import APIRouter, Body, Depends, HTTPException, status, Response
from app.api.middlewares.http_basic_auth import *

from app.tasks.mail_task import send_testmail, send_webhook_mail
from app.custom.models.notifications import NotificationPayload

router = APIRouter()


@router.post("/send", summary="Send Test Mail", status_code=status.HTTP_204_NO_CONTENT,
             response_class=Response, dependencies=[Depends(basic_auth)])
async def send_mail(payload: NotificationPayload):
    send_testmail.delay(payload.mail_address)

    return Response(status_code=status.HTTP_204_NO_CONTENT)


# @router.post("/webhook/send", summary="Create Swobup Mail", status_code=status.HTTP_204_NO_CONTENT,
#              response_class=Response, dependencies=[Depends(basic_auth)])
# async def send_webhook_mail():
#     send_webhook_mail.delay()
#
#     return Response(status_code=status.HTTP_204_NO_CONTENT)
