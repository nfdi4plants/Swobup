import obonet
from io import StringIO
import sys
import pandas as pd

from celery.result import AsyncResult
from celery import chain

from fastapi import APIRouter, Body, Depends, HTTPException
from app.github.webhook_payload import PushWebhookPayload

from app.tasks.process_ontology import ontology_task

from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser


from app.helpers.oboparsing.models.term import Term
from app.helpers.oboparsing.models.ontology import Ontology
from app.helpers.oboparsing.models.relationships import Relationships
from app.helpers.oboparsing.models.obo_file import OboFile

router = APIRouter()

@router.post("")
async def update(payload: PushWebhookPayload):

    print("sending to celery...")

    # ret = chain(ontology_task.s(payload.commits), ontology_task.s(payload.commits)).apply_async()

    # bla = {"bla":"blu"}

    bla = payload.dict()


    result = ontology_task.delay(bla)


    #print("result:", result.get())

    obo_file = result.get()

    print("file", obo_file)


    # obo_model = OboFile.parse_obj(obo_file)

    # print("modell:", obo_file)
    #
    # print(obo_file)

    data = obo_file.get("terms")




    print("results")
    result_df = pd.DataFrame(data)

    result_df.to_csv("output.csv", sep=',')

    relations_df = pd.DataFrame(obo_file.get("relationships"))
    ontologies_df = pd.DataFrame(obo_file.get("ontologies"))

    relations_df.to_csv("output-rel.csv", sep=',')
    ontologies_df.to_csv("output-ont.csv", sep=',')

    # print(result_df)



    # print("in ontology")
    # print("payload", payload)
    # print("respository:", payload.repository)
    # # print("author:", payload.author)
    # print("commits:", payload.commits)
    # print("sender:", payload.sender)
    # print("pusher:", payload.pusher)
    #
    # print("hash: ", payload.after)
    #
    # print("email:", payload.pusher.email)
    #
    #
    #
    # repository_full_name = payload.repository.full_name
    # commit_hash = payload.after
    #
    # commits = payload.commits
    #
    # for commit in commits:
    #     print(commit.modified)
    #     for file in commit.modified:
    #         github_downloader = GitHubDownloader(file, repository_full_name, commit_hash)
    #         current_file = github_downloader.download_file().decode()
    #
    #         # print(current_file)
    #
    #         ontology_buffer = StringIO(current_file)
    #
    #         print(ontology_buffer)
    #
    #         # graph = obonet.read_obo(ontology_buffer)
    #
    #         obo_parser = OBO_Parser(ontology_buffer)
    #
    #         data = obo_parser.parse()
    #
    #         df = pd.DataFrame(data)
    #
    #         print(df)
    #
    #         df.to_csv("output.csv", sep=',')


    # github_downloader = GitHubDownloader()


