from fastapi import APIRouter, Body, Depends, HTTPException
from app.github.webhook_payload import PushWebhookPayload

router = APIRouter()

@router.post("")
async def update(payload: PushWebhookPayload):
    print("in ontology")
    print("payload", payload)
    print("respository:", payload.repository)
    # print("author:", payload.author)
    print("commits:", payload.commits)
    print("sender:", payload.sender)
    print("pusher:", payload.pusher)

    print("hash: ", payload.after)
