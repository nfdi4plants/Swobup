import obonet
from io import StringIO
import sys
import requests
import pandas as pd
import json
import base64

from celery.result import AsyncResult
from celery import chain

from fastapi import APIRouter, Body, Depends, HTTPException, status, Response, Request
from app.github.webhook_payload import PushWebhookPayload

from app.tasks.ontology_tasks import ontology_webhoook_task
from app.tasks.ontology_tasks import ontology_build_from_scratch

from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser

from app.helpers.models.ontology.term import Term
from app.helpers.models.ontology.ontology import Ontology
from app.helpers.models.ontology.relationships import Relationships
from app.helpers.models.ontology.obo_file import OboFile
from app.github.github_api import GithubAPI
from app.helpers.general_downloader import GeneralDownloader

from app.tasks.database_tasks import add_ontologies
from app.tasks.database_tasks import update_ontologies

from app.custom.models.add_ontology import AddOntologyPayload
from app.custom.models.delete_ontology import DeleteOntologyPayload

from app.api.middlewares.github_authentication import *

from app.tasks.ontology_tasks import add_ontology_task
from app.tasks.database_tasks import update_ontologies

from app.tasks.template_tasks import add_template_custom, delete_template_custom, delete_template_all_custom, \
    template_build_from_scratch

from app.github.github_api import GithubAPI



from app.neo4j.neo4jConnection import Neo4jConnection

router = APIRouter()

# ,  dependencies=[Depends(github_authentication)]


def generate_hash_signature(
        secret: bytes,
        payload: bytes,
        digest_method=hashlib.sha256,
):
    return hmac.new(secret, payload, digest_method).hexdigest()

@router.post("/ontology", summary="Ontology Webhook", status_code=status.HTTP_204_NO_CONTENT,
             response_class=Response,  dependencies=[Depends(github_authentication)])
async def ontology(request: Request, payload: PushWebhookPayload):
    print("sending to celery...")

    body = await request.body()

    # payload_dictionary = payload

    print("body", body)

    print("payload", payload.dict())

    repository_name = payload.repository.full_name
    branch = payload.ref.split("/")[-1]
    branch = payload.after
    hash_id = payload.after
    commits = payload.commits.pop()

    modified = commits.modified
    added = commits.added
    removed = commits.removed

    update_files = modified + added

    print(branch, hash_id, update_files, removed)

    github_api = GithubAPI(repository_name, branch)

    update_urls = []
    remove_urls = []

    for filename in update_files:
        print("filename", filename)
        if ".obo" or ".testobo" in filename:
            update_urls.append(github_api.convert_to_raw_url(filename))

    for url in update_urls:
        chain(add_ontology_task.s(url), update_ontologies.s()).apply_async()

    # TODO: same for removed urls
    # for url in remove_urls:
    #     chain(update_ontology_task.s(url), update_ontologies.s()).apply_async()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/template", summary="Template Webhook", status_code=status.HTTP_204_NO_CONTENT,
             response_class=Response, dependencies=[Depends(github_authentication)])
async def template(request: Request, payload: PushWebhookPayload):
    body = await request.body()

    print("body", body)
    print("payload", payload.dict())
    repository_name = payload.repository.full_name
    branch = payload.ref.split("/")[-1]
    branch = payload.after
    hash_id = payload.after
    commits = payload.commits.pop()

    modified = commits.modified
    added = commits.added
    removed = commits.removed

    update_files = modified + added

    print(branch, hash_id, update_files, removed)

    update_files = modified + added

    print(branch, hash_id, update_files, removed)

    github_api = GithubAPI(repository_name, branch)

    update_urls = []
    remove_urls = []

    for filename in update_files:
        update_urls.append(github_api.convert_to_raw_url(filename))

    print("updates", update_urls)

    for url in update_urls:
        if ".xlsx" in filename:
            # chain(add_ontology_task.s(url), update_ontologies.s()).apply_async()
            add_template_custom.delay(url)

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/test", summary="Test authentication Webhook", status_code=status.HTTP_204_NO_CONTENT)
async def test(request: Request, x_hub_signature_256:str = Header(None)):
    payload = await request.body()
    # payload = payload.decode()
    print("pp", payload)
    secret = os.environ.get("GITHUB_SECRET").encode("utf-8")
    # signature = generate_hash_signature(secret, payload.encode())
    signature = generate_hash_signature(secret, payload)

    print("signature", f"sha256={signature}")
    print("xhub", x_hub_signature_256)

    if x_hub_signature_256 != f"sha256={signature}":
        raise HTTPException(status_code=401, detail="Auth Error")
    return {}

    print("login successful")

    return Response(status_code=204)
