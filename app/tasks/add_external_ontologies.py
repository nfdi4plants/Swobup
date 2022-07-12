import io

import obonet
import networkx
import datetime
import sys
import pandas as pd
from io import StringIO

from tasks import app
from app.github.webhook_payload import PushWebhookPayload
from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser

from app.helpers.general_downloader import GeneralDownloader

from resource import *


from app.helpers.oboparsing.models.term import Term
from app.helpers.oboparsing.models.ontology import Ontology
from app.helpers.oboparsing.models.relationships import Relationships
from app.helpers.oboparsing.models.obo_file import OboFile

from app.custom.custom_payload import CustomPayload

@app.task
def add_extern_task(payload):

    print("external ontologies: ", payload.get("external_ontologies"))

    # repository_full_name = payload.repository.full_name
    # commit_hash = payload.after

    urls = payload.get("external_ontologies")

    # print("before download:", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 / 1024)

    for url in urls:
        print("commit", url)
        # print(commit.modified)
        general_downloader = GeneralDownloader(url)
        current_file = general_downloader.download_file()

        # print("after download:", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 / 1024)


        # ontology_buffer = StringIO(current_file)

        ontology_buffer = io.TextIOWrapper(current_file, newline=None)

        obo_parser = OBO_Parser(ontology_buffer)
        data = obo_parser.parse()
        print("parsing finished")

    # print("end of", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 /1024)

    return data

