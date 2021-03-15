import falcon
import json
import sys

from pobo import Parser
from io import StringIO

from ..helpers.configurator import Configurator
from ..helpers.gitHub_downloader import GithubDownloader

from ..helpers.database.database_connector import *
from ..helpers.obo_store import *


class CreateTables(object):
    def on_post(self, req, resp):

        config = Configurator("swobup/config/config.conf")

        db_host = config.get_config("database", "host")
        db_user = config.get_config("database", "user")
        db_password = config.get_config("database", "password")
        db_name = config.get_config("database", "dbname")

        body = req.media

        database = DatabaseConnector(db_host, db_user, db_password, db_name)
        #database.create_tables()
        database.create_protocol_tables()


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