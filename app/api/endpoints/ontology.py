import obonet
from io import StringIO

import pandas as pd

from fastapi import APIRouter, Body, Depends, HTTPException
from app.github.webhook_payload import PushWebhookPayload

from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser

router = APIRouter()

@router.post("")
async def update(payload: PushWebhookPayload):
    print("in ontology")
    print("payload", payload)
    print("respository:", payload.repository)
    # print("author:", payload.author)
    print("commits:", payload.commits)
    print("sender:", payload.sender)
    print("pusher:", payload.pusher)

    print("hash: ", payload.after)

    print("email:", payload.pusher.email)



    repository_full_name = payload.repository.full_name
    commit_hash = payload.after

    commits = payload.commits

    for commit in commits:
        print(commit.modified)
        for file in commit.modified:
            github_downloader = GitHubDownloader(file, repository_full_name, commit_hash)
            current_file = github_downloader.download_file().decode()

            # print(current_file)

            ontology_buffer = StringIO(current_file)

            print(ontology_buffer)

            # graph = obonet.read_obo(ontology_buffer)

            obo_parser = OBO_Parser(ontology_buffer)

            data = obo_parser.parse()

            df = pd.DataFrame(data)

            print(df)

            df.to_csv("output.csv", sep=',')


    # github_downloader = GitHubDownloader()



