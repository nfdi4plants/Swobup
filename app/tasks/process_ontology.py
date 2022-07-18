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


@app.task
def ontology_task(payload):

    print("payload", payload)

    print("commits")
    print(payload.get("commits"))

    commits = payload.get("commits")
    repository_full_name = payload.get("repository").get("full_name")
    commit_hash = payload.get("after")

    print(repository_full_name)
    print(commit_hash)

    # repository_full_name = payload.repository.full_name
    # commit_hash = payload.after

    for commit in commits:
        print("commit", commit)
        # print(commit.modified)
        for file in commit.get("modified"):
            github_downloader = GitHubDownloader(file, repository_full_name, commit_hash)
            current_file = github_downloader.download_file().decode()

            ontology_buffer = StringIO(current_file)

            # graph = obonet.read_obo(ontology_buffer)

            obo_parser = OBO_Parser(ontology_buffer)


            data = obo_parser.parse()

            # df = pd.DataFrame(data.get("terms"))

            print(data)

            #df.to_csv("output.csv", sep=',')#


    return data

