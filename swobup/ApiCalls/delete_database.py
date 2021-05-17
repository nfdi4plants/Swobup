import falcon
import json
import sys
from io import StringIO

from ..helpers.configurator import Configurator
from ..helpers.gitHub_downloader import GithubDownloader

from ..helpers.database.database_connector import *
from ..helpers.obo_store import *


class DeleteDatabase(object):
    def on_delete(self, req, resp):

        config = Configurator("swobup/config/config.conf")

        body = req.media

        database = DatabaseConnector()
        database.delete_rows()


        result_json = {
            "status": "success"
        }

        resp.body = json.dumps(result_json, ensure_ascii=False)
        resp.status = falcon.HTTP_200

    def test(self):
        test = [
            {
                "Accession": "UO:00000001",
                "FK_OntologyID": 1,
                "Name": "test",
                "Definition": "test",
                "XrefValueType": 0,
                "isObsolete": 0
            },
            {
                "Accession": "UO:00000002",
                "FK_OntologyID": 1,
                "Name": "test2",
                "Definition": "test2",
                "XrefValueType": 0,
                "isObsolete": 0
            }
        ]