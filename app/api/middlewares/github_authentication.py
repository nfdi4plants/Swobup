import hashlib
import hmac
import os

from fastapi import HTTPException, status, Request, Header


def generate_hash_signature(
        secret: bytes,
        payload: bytes,
        digest_method=hashlib.sha256):
    return hmac.new(key=secret, msg=payload, digestmod=digest_method).hexdigest()


async def github_authentication(request: Request, x_hub_signature_256: str = Header(None)):
    payload = await request.body()
    secret = os.environ.get("GITHUB_SECRET").encode("utf-8")
    signature = generate_hash_signature(secret, payload)
    # if x_hub_signature_256 != f"sha256={signature}":
    #     raise HTTPException(status.HTTP_401_UNAUTHORIZED,
    #                         detail="Not Authorized")
    # return
