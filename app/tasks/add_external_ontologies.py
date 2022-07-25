import io

import celery.result
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
from app.helpers.s3_storage import S3Storage

from celery.result import AsyncResult

from resource import *

from app.custom.custom_payload import CustomPayload

from celery.backends.s3 import S3Backend
from tasks import app
import json


# class BaseTaskWithRetry(app.Task):
#     autoretry_for = (Exception, KeyError)
#     retry_kwargs = {'max_retries': 3}
#     retry_backoff = True


@app.task(bind=True)
def add_extern_task(self, url):
    general_downloader = GeneralDownloader(url)
    current_file = general_downloader.download_file()

    # print("after download:", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 / 1024)

    # ontology_buffer = StringIO(current_file)

    ontology_buffer = io.TextIOWrapper(current_file, newline=None)

    obo_parser = OBO_Parser(ontology_buffer)
    data = obo_parser.parse()
    print("parsing finished")

    # print("end of", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 /1024)

    # print("ID", celery.result.AsyncResult.result)
    # print("task_id", self.request.id)
    #
    # s3_storage = S3Storage()
    #
    # s3_storage.download_one_file(self.request.id)

    backend = S3Backend(app=app)

    s3_key = backend.get_key_for_task(self.request.id).decode()
    s3_key = str(s3_key)+"-results"
    print("s3_key", s3_key)
    backend.set(key=s3_key, value=json.dumps(data))


    res = {"task_id": str(s3_key)}

    print("s3 uploaded...")

    return res
