import hashlib
import hmac
import os
import secrets

from fastapi import Depends, FastAPI, HTTPException, status, Request, Header, Body
from fastapi.security import HTTPBasic, HTTPBasicCredentials, HTTPBearer

security = HTTPBearer()


def generate_hash_signature(
        secret: bytes,
        payload: bytes,
        digest_method=hashlib.sha256):
    return hmac.new(secret, payload, digest_method).hexdigest()


# TODO: This has to be done...
async def github_authentication(request: Request, x_hub_signature_256: str = Header(None)):
    payload = await request.body()
    secret = os.environ.get("GITHUB_SECRET").encode("utf-8")
    signature = generate_hash_signature(secret, payload)
    print("sig", signature)
    print("sig header", x_hub_signature_256)
    # if x_hub_signature_256 != f"sha256={signature}":
    if x_hub_signature_256 != signature:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED,
                            detail="Not Authorized")
    return {}
