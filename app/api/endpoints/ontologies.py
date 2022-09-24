from celery import chain

from fastapi import APIRouter, Body, Depends, HTTPException, status, Response
from app.github.github_api import GithubAPI
from app.helpers.general_downloader import GeneralDownloader

from app.tasks.ontology_tasks import add_ontology_task
from app.tasks.database_tasks import add_ontologies

from app.custom.models.add_ontology import AddOntologyPayload
from app.custom.models.delete_ontology import DeleteOntologyPayload
from app.tasks.ontology_tasks import delete_ontology_task
from app.api.middlewares.http_basic_auth import *
from app.helpers.notifications.models.notification_model import Notifications, Message

router = APIRouter()

@router.put("/build", summary="Build and add ontologies from scratch", status_code=status.HTTP_204_NO_CONTENT,
            response_class=Response, dependencies=[Depends(basic_auth)])
async def build_from_scratch():
    urls = []

    repository_name = os.environ.get("ONTOLOGY_REPOSITORY", "nfdi4plants/nfdi4plants_ontology")
    branch = "main"
    github_api = GithubAPI(repository_name=repository_name)

    tree = github_api.get_master_tree(branch).get("tree")

    for file in tree:
        current_path = github_api.convert_to_raw_url(file.get("path"), branch)
        if ".obo" in current_path:
            urls.append(current_path)
        if ".include" in current_path:
            general_downloader = GeneralDownloader(current_path)
            url_list = general_downloader.download_file()
            for url in url_list:
                # if "ncbitaxon" in url.decode():
                #     continue
                urls.append(url.decode().strip())

    for url in urls:
        chain(add_ontology_task.s(url), add_ontologies.s()).apply_async()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("", summary="Add ontology by URL",
             status_code=status.HTTP_201_CREATED,
             response_class=Response,
             dependencies=[Depends(basic_auth)])
async def add_ontology(payload: AddOntologyPayload):
    print("adding ontology...")

    result_ids = []
    task_results = []

    #notification_color = Colors()

    notifications = Notifications(messages=[])
    notifications.is_webhook = False
    notifications.messages.append(Message(type="success", message="succeeded"))


    notifications_json = notifications.dict()


    for url in payload.url:
        print("current_url", url)
        # result = chain(add_ontology_task.s(url), add_ontologies.s()).apply_async()
        # result = chain(add_ontology_task.s(url, notifications_json), add_ontologies.s(), send_webhook_mail.s()).apply_async()
        result = chain(add_ontology_task.s(url), add_ontologies.s()).apply_async()
        result_ids.append(result.id)
        # task_results.append(result.get())

    # print("res IDS", result_ids)
    # show_tasks_results.delay(result_ids)

    return Response(status_code=status.HTTP_201_CREATED)


@router.delete("", summary="Delete ontology by name", status_code=status.HTTP_204_NO_CONTENT,
               response_class=Response,
               dependencies=[Depends(basic_auth)])
async def delete_ontology(payload: DeleteOntologyPayload):
    payload = payload.dict()
    delete_ontology_task.delay(payload)

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.delete("/clear", summary="Delete all ontologies", status_code=status.HTTP_204_NO_CONTENT,
               response_class=Response,
               dependencies=[Depends(basic_auth)])
async def delete_all_ontologies():
    # result = delete_template_all_custom.delay()
    print("Deleting all ontologies could take a very long time...")
    print("This feature is not implemented")

    return Response(status_code=status.HTTP_204_NO_CONTENT)
