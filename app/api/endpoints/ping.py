from fastapi import APIRouter, Body, Depends, HTTPException

router = APIRouter()

@router.get("/")
async def ping():
    return {"message": "pong"}