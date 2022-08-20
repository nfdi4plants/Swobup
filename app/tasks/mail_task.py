import obonet
import networkx
import datetime
import sys
import pandas as pd
from io import StringIO

import time

from tasks import app
from app.github.webhook_payload import PushWebhookPayload
from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser

from celery.result import AsyncResult

from app.neo4j.neo4jConnection import Neo4jConnection

from app.helpers.s3_storage import S3Storage

from celery.backends.s3 import S3Backend
import json


@app.task
def show_tasks_results(task_ids: list, task_results: list):
    status: list = []

    while len(task_ids) >= 1:
        print("in loop")
        for task_id in task_ids:
            res = AsyncResult(task_id, app=app)
            print("status: ", res.state)
            if res.state == "SUCCESS":
                task_ids.remove(task_id)
                status.append(task_id)
            if res.state == "FAILED":
                task_ids.reverse(task_id)

    print("sending mail...")
    print("exited:", status)
    for _status in status:
        current_task = AsyncResult(_status, app=app)
        print("::", current_task.result)
        # print("::", current_task.get())
    print("--", task_results)