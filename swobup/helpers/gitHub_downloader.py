import json
import falcon
from falcon.http_status import HTTPStatus
import requests
import logging

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
        response = requests.get(location, headers=self.headers)

        if response.status_code != 200:
            logging.info("File not found: ", location)
            return {}

        modified_file = response.content

        return modified_file

    # not used but good example
    def get_tree(self, tree_hash):
        location = "https://api.github.com/repos/" + self.github_repository \
                   + "/git/trees/7c249acabf538c84c0a6e18013e465c8f2d5b42a"

        location = "https://api.github.com/repos/" + self.github_repository + "/git/trees/" + tree_hash

        response = requests.get(location, headers=self.headers)

        print(response.content)
