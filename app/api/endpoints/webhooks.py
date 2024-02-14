from celery import chain

from fastapi import APIRouter, Body, Depends, HTTPException, status, Response, Request
from app.github.webhook_payload import PushWebhookPayload
from app.api.middlewares.github_authentication import *

from app.tasks.ontology_tasks import add_ontology_task, process_ext_ontolgies
from app.tasks.database_tasks import update_ontologies

from app.tasks.template_tasks import delete_template_custom, delete_template_all_custom, \
    template_build_from_scratch, add_templates

from app.github.github_api import GithubAPI

from app.helpers.notifications.models.notification_model import Notifications, Message
from app.tasks.mail_task import show_tasks_results, send_webhook_mail

router = APIRouter()


# ,  dependencies=[Depends(github_authentication)]


def generate_hash_signature(
        secret: bytes,
        payload: bytes,
        digest_method=hashlib.sha256,
):
    return hmac.new(secret, payload, digest_method).hexdigest()


@router.post("/ontology", summary="Ontology Webhook", status_code=status.HTTP_204_NO_CONTENT,
             response_class=Response, dependencies=[Depends(github_authentication)])
# @router.post("/ontology", summary="Ontology Webhook", status_code=status.HTTP_204_NO_CONTENT,
#              response_class=Response)
async def ontology(request: Request, payload: PushWebhookPayload):
    print("sending to celery...")

    body = await request.body()

    # payload_dictionary = payload

    print("body", body)

    print("payload", payload.dict())

    # BRANCH DETECTION (TESTING)
    ontology_branch = os.environ.get("ONTOLOGY_BRANCH", "off")
    ref = payload.ref.split("/")[-1]

    if ontology_branch != "off":
        if ref != ontology_branch:
            return

    repository_name = payload.repository.full_name
    ref = payload.ref.split("/")[-1]
    branch = payload.after
    hash_id = payload.after
    # commits = payload.commits.pop()

    #TODO: remove following ?
    #commits = payload.commits[-1]

    #modified = commits.modified
    #added = commits.added
    #removed = commits.removed

    modified = []
    added = []
    removed = []

    # TODO: check if thats working
    commits = payload.commits
    for commit in commits:
       print("current commit", commit)
       modified = modified + commit.modified
       added = added + commit.added
       removed = removed + commit.removed


    update_files = modified + added

    print(branch, hash_id, update_files, removed)

    github_api = GithubAPI(repository_name)

    notifications = Notifications(messages=[])
    notifications.is_webhook = True
    notifications.email = payload.commits[-1].author.email
    # notifications.commit.commit_hash = payload.after
    # notifications.commit.commit_url = payload.repository.html_url
    # notifications.commit.commit_text = payload.commits[0].message
    notifications.commit_hash = payload.after
    notifications.commit_url = payload.commits[-1].url
    notifications.commit_text = payload.commits[-1].message
    notifications.author = payload.pusher.name
    notifications.project = payload.repository.full_name

    notifications.branch = "main"

    notifications_json = notifications.dict()

    update_urls = []
    remove_urls = []

    include_urls = []

    for filename in update_files:
        print("filename", filename)
        if filename.endswith(".obo"):
            update_urls.append(github_api.convert_to_raw_url(filename, branch))

        if filename.endswith(".include"):
            url_tuple = (github_api.convert_to_raw_url(filename, payload.before),
                         github_api.convert_to_raw_url(filename, payload.after))
            include_urls.append(url_tuple)

    for url_tuple in include_urls:
        process_ext_ontolgies.delay(url_tuple, notifications=notifications_json)

    for url in update_urls:
        chain(add_ontology_task.s(url, notifications=notifications_json), update_ontologies.s(),
              send_webhook_mail.s()).apply_async()

    # TODO: same for removed urls
    # for url in remove_urls:
    #     chain(update_ontology_task.s(url), update_ontologies.s()).apply_async()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/template", summary="Template Webhook", status_code=status.HTTP_204_NO_CONTENT,
             response_class=Response, dependencies=[Depends(github_authentication)])
# @router.post("/template", summary="Template Webhook", status_code=status.HTTP_204_NO_CONTENT,
#              response_class=Response)
async def template(request: Request, payload: PushWebhookPayload):
    print("webhook")
    body = await request.body()

    ref = payload.ref.split("/")[-1]

    # BRANCH DETECTION (TESTING)
    template_branch = os.environ.get("TEMPLATE_BRANCH", "off")
    ref = payload.ref.split("/")[-1]

    if template_branch != "off":
        if ref != template_branch:
            return

    notifications = Notifications(messages=[])
    notifications.is_webhook = True
    notifications.email = payload.commits[-1].author.email
    # notifications.commit.commit_hash = payload.after
    # notifications.commit.commit_url = payload.repository.html_url
    # notifications.commit.commit_text = payload.commits[0].message
    notifications.commit_hash = payload.after
    notifications.commit_url = payload.commits[-1].url
    notifications.commit_text = payload.commits[-1].message
    notifications.author = payload.pusher.name
    notifications.project = payload.repository.full_name

    notifications.branch = "main"

    print("body", body)
    print("payload", payload.dict())
    repository_name = payload.repository.full_name
    branch = payload.ref.split("/")[-1]
    branch = payload.after
    hash_id = payload.after
    commits = payload.commits

    modified = []
    added = []
    removed = []

    for commit in commits:
        print("current commit", commit)
        modified = modified + commit.modified
        added = added + commit.added
        removed = removed + commit.removed

    # print("commits", commits)
    #
    # modified = commits.modified
    # added = commits.added
    # removed = commits.removed

    update_files = modified + added

    update_files = list(dict.fromkeys(update_files))

    print(branch, hash_id, update_files, removed)

    # update_files = modified + added

    # print(branch, hash_id, update_files, removed)

    github_api = GithubAPI(repository_name)

    update_urls = []
    remove_urls = []

    for filename in update_files:
        update_urls.append(github_api.convert_to_raw_url(filename, branch))

    print("updates", update_urls)

    notifications_json = notifications.dict()

    print("urls found", update_urls)

    for url in update_urls:
        print("current url", url)
        if filename.endswith(".xlsx"):
            # chain(add_ontology_task.s(url), update_ontologies.s()).apply_async()
            # add_template_custom.delay(url, notifications_json)
            # chain(add_template_custom.s(url, notifications=notifications_json), send_webhook_mail.s()).apply_async()
            chain(add_templates.s(url, notifications=notifications_json), send_webhook_mail.s()).apply_async()

    return Response(status_code=status.HTTP_204_NO_CONTENT)
