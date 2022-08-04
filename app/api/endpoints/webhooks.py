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

@router.post("/ontology", summary="Ontology Webhook", status_code=status.HTTP_204_NO_CONTENT,
             response_class=Response)
async def ontology(request: Request, payload: PushWebhookPayload):
    print("sending to celery...")

    body = await request.body()
    body = bytes(body,'utf-8')

    # sec = "test".encode()
    #
    # def compute_hmac(data):
    #     mac = hmac.new(
    #         sec.encode("utf8"), msg=data, digestmod=hashlib.sha256
    #     )
    #     return str(mac.hexdigest())

    def compare_signature(digestmod, key: bytes, message: bytes, expected_signature: str) -> bool:
        mac = hmac.new(key, message, digestmod)
        print("mac", mac.hexdigest())
        return hmac.compare_digest(mac.hexdigest(), expected_signature)

    sec = b"test"
    # mac = compute_hmac(body)
    webhook_signature="sha256=e7702b88548cf5f32954b3300702abd9a0d8a3da549bbd6261189beb7de15740"

    # print("mac", mac)
    # print("bb", compute_hmac(body.decode().strip().encode('utf-8')))

    print(compare_signature("sha256", sec, body, webhook_signature))

    sys.exit()

    payload_dictionary = payload



    # secret = os.environ.get("GITHUB_SECRET").encode("utf-8")
    # signature = generate_hash_signature(secret, payload)
    # print("checking signature")
    # if x_hub_signature != f"sha1={signature}":
    #     raise HTTPException(status_code=401, detail="Authentication error.")

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
        # chain(add_ontology_task.s(url), update_ontologies.s()).apply_async()
        add_template_custom.delay(url)

    return Response(status_code=status.HTTP_204_NO_CONTENT)
