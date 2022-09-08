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
from app.api.middlewares.http_basic_auth import *

from app.tasks.ontology_tasks import add_ontology_task
from app.tasks.database_tasks import update_ontologies

from app.tasks.template_tasks import add_template_custom, delete_template_custom, delete_template_all_custom, \
    template_build_from_scratch

from app.github.github_api import GithubAPI

from app.neo4j.neo4jConnection import Neo4jConnection

from app.search.search import *

router = APIRouter()

from app.helpers.shared_memory import Meta

cache = Meta(inverted_list={})

# qgram = QGramIndex(3)



# ,  dependencies=[Depends(github_authentication)]

# global invertedList

@router.get("/find", summary="Template Webhook", status_code=status.HTTP_200_OK,
             response_class=Response)
async def template(request: Request, q:str):

    print("q", q)

    qgram = QGramIndex(3)

    qgram.set_inverted_list(cache.get_invertedList())


    inp = qgram.normalize(q)
    delta = math.floor((len(q) / 4))
    test = "bla"

    inverted_list = cache.get_invertedList()
    words = cache.get_words()
    qgram.set_wordlist(words)


    resultList = qgram.find_matches(inp, delta)
    resultList = qgram.rank_matches(resultList)

    found_words = []

    for index in resultList[0:19]:
        print(words[index[0] - 1])
        found_words.append(words[index[0] - 1])


    results = {
        "results": found_words
    }

    results = json.dumps(results)








    return Response(status_code=status.HTTP_200_OK, content=results)


@router.post("/init", summary="Template Webhook", status_code=status.HTTP_200_OK,
             response_class=Response,
               dependencies=[Depends(basic_auth)])
async def template(request: Request):

    qgram = QGramIndex(3)
    qgram.build_from_db()

    inverted_list = qgram.get_inverted_list()
    cache.update_invertedList(inverted_list)
    words = qgram.get_wordlist()
    cache.update_wordlist(words)

    print("building complete")



    return Response(status_code=status.HTTP_204_NO_CONTENT)