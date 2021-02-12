import json
import falcon
from falcon.http_status import HTTPStatus
import requests
import sys

from ..helpers.configurator import Configurator


class GithubDownloader:
    def __init__(self, repository_name):
        config = Configurator("swobup/config/config.conf")
        self.auth_token = config.get_config("github", "token")
        self.github_user = config.get_config("github", "user")
        # self.github_repository = config.get_config("github", "repository")
        self.github_repository = repository_name
        self.download_path = config.get_config("github", "download_path")

        self.headers = {'Authorization': 'token ' + self.auth_token,
                        'Accept': 'application/vnd.github.v3.raw'
                        }

    def download_file(self, commit_hash, file_name):
        location = "https://raw.githubusercontent.com/" + self.github_repository + "/" + commit_hash + "/" + file_name
        # print(location)

        response = requests.get(location, headers=self.headers)

        # print("resonse", response.text)

        modified_file = response.text

        return modified_file
