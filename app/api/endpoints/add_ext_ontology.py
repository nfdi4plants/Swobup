import obonet
from io import StringIO
import sys
import pandas as pd

from celery.result import AsyncResult
from celery import chain

from fastapi import APIRouter, Body, Depends, HTTPException
from app.github.webhook_payload import PushWebhookPayload

from app.tasks.process_ontology import ontology_task
from app.custom.custom_payload import CustomPayload

from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser


from app.helpers.oboparsing.models.term import Term
from app.helpers.oboparsing.models.ontology import Ontology
from app.helpers.oboparsing.models.relationships import Relationships
from app.helpers.oboparsing.models.obo_file import OboFile

from app.tasks.add_external_ontologies import add_extern_task
from app.tasks.add_to_database import write_to_db

from resource import *

router = APIRouter()

@router.post("")
async def add_extern(payload: CustomPayload):

    print("sending to celery...")

    bli = payload.external_ontologies

    # print("before download:", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 / 1024)

    print(bli)

    bla = payload.dict()

    # print("converted tro dict:", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 / 1024)

    print("bla", bla)

    # result = add_extern_task.delay(bla)

    result = chain(add_extern_task.s(bla), write_to_db.s()).apply_async()

    # print("result returned:", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 / 1024)

    print("results:", result)

    obo_file = result.get()
    data = obo_file.get("terms")

    print(obo_file.get("terms"))

    result_df = pd.DataFrame(data)

    result_df.to_csv("output.csv", sep=',',index=None)

    relations_df = pd.DataFrame(obo_file.get("relationships"))
    ontologies_df = pd.DataFrame(obo_file.get("ontologies"))

    relations_df.to_csv("output-rel.csv", sep=',',index=None)
    ontologies_df.to_csv("output-ont.csv", sep=',',index=None)



    # result = ontology_task.delay(bla)
    #
    # obo_file = result.get()
    #
    # terms_df = pd.DataFrame(obo_file.get("terms"))
    #
    # terms_df.to_csv("output.csv", sep=',')
    #
    # relations_df = pd.DataFrame(obo_file.get("relationships"))
    # ontologies_df = pd.DataFrame(obo_file.get("ontologies"))
    #
    # relations_df.to_csv("output-rel.csv", sep=',')
    # ontologies_df.to_csv("output-ont.csv", sep=',')



