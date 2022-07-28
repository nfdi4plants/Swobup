import hashlib
import hmac
import os
import secrets

from fastapi import Depends, FastAPI, HTTPException, status, Request, Header, Body
from fastapi.security import HTTPBasic, HTTPBasicCredentials

security = HTTPBasic()

def generate_hash_signature(
        secret: bytes,
        payload: bytes,
        digest_method = hashlib.sha256
):
    return hmac.new(secret, payload, digest_method).hexdigest()

# TODO: This has to be done...
def github_auth(request: Request):
    print("req", request)
    # payload = await request.body()
    # print("payaaa", payload)
    secret = os.environ.get("GITHUB_SECRET").encode("utf-8")
    # signature = generate_hash_signature(secret, payload)
    # print("sig",signature)
    # correct_username = secrets.compare_digest(credentials.username, os.getenv("SWOBUP_USERNAME"))
    # correct_password = secrets.compare_digest(credentials.password, os.getenv("SWOBUP_PASSWORD"))
    # if not (correct_username and correct_password):
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Not Authorized",
    #         headers={"Authorization": "Basic"},
    #     )
    # return credentials.username
