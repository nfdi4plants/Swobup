import datetime

import falcon
import json

from io import StringIO
from io import BytesIO

from ..helpers.configurator import Configurator
from ..helpers.gitHub_downloader import GithubDownloader

from ..helpers.database.database_connector import *
from ..helpers.obo_store import *

from ..helpers.request_store import RequestStore


class OntologyUpdate(object):
    def on_post(self, req, resp):

        # database handler should be in a middleware in a future version

        config = Configurator("swobup/config/config.conf")

        body = json.loads(RequestStore.body)

        # file_name = config.get_config("file", "name")
        # ontology_name = config.get_config("file", "ontology")

        db_host = config.get_config("database", "host")
        db_user = config.get_config("database", "user")
        db_password = config.get_config("database", "password")
        db_name = config.get_config("database", "dbname")

        modified_files = body.get("head_commit").get("modified")
        added_files = body.get("head_commit").get("added")
        removed_files = body.get("head_commit").get("removed")
        repository_name = body.get("repository").get("full_name")
        commit_hash = body.get("head_commit").get("id")

        database = DatabaseConnector(db_host, db_user, db_password, db_name)

        # build file name list to support multiple obo files
        # file_name_list = file_name.split(',')

        for file in modified_files or added_files:
            if ".obo" in file:

                github_downloader = GithubDownloader(repository_name)
                mod_file = github_downloader.download_file(commit_hash, file).decode()
                fake_file = StringIO(mod_file)

                obo_store = OboStore(fake_file)
                ontology_name = obo_store.get_ontology()

                stored_terms = obo_store.get_storage()

                if not database.is_connected:
                    result_json = {
                        "status": "failed",
                        "message": "could not connect to database"
                    }

                    raise falcon.HTTPUnauthorized(result_json)

                if not database.ontology_entry_exists(ontology_name):
                    name = obo_store.get_name()
                    version = obo_store.get_version()
                    author = obo_store.get_saved_by()
                    timestamp = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
                    database.insert_ontology(name, version, "", timestamp, author)

                ontology_id = database.get_ontology_id(ontology_name)
                obo_store.parse(ontology_id)

                # delete all terms with specific ontology_name
                database.delete_rows(ontology_name)

                # add new terms to ontology with specific ontology_name
                database.insert_terms(stored_terms)

                # relationTerm Table
                # get reealtionDict
                stored_relationships = obo_store.get_storage()

                rel_errors = []

                for item in stored_relationships:
                    if item.get("is_a"):
                        for is_a in item.get("is_a"):

                            if database.accession_to_id(item.get("Accession")) is None:
                                rel_errors.append("Term has no ID in database: " + item.get("Accession"))

                            if database.accession_to_id(is_a) is None:
                                # print("ISA", item.get("Accession --> " + is_a))
                                rel_errors.append("TermRelated has no ID in database: " + is_a)

                            obo_store.add_rel(database.accession_to_id(item.get("Accession")),
                                              database.accession_to_id(is_a))
                            # print(str(item.get("Accession")) + "-->" +str(is_a))

                insert_relations = obo_store.get_relstorage()

                database.insert_relterms(insert_relations)

                result_json = {
                    "status": "success",
                    "relation-errors": rel_errors
                }

                resp.body = json.dumps(result_json, ensure_ascii=False)
                resp.status = falcon.HTTP_200

        if removed_files:
            # get id of last version
            before_commit_hash = body.get("before")
            for removed_file in removed_files:
                if ".obo" in removed_file:
                    github_downloader = GithubDownloader(repository_name)
                    obo_file = github_downloader.download_file(before_commit_hash, removed_file).decode()
                    ontology_buffer = StringIO(obo_file)

                    obo_store = OboStore(ontology_buffer)
                    ontology_name = obo_store.get_name()
                    if ontology_name is None:
                        print("no name found")
                        continue
                    else:
                        database.delete_ontology_row(ontology_name)

            result_json = {
                "status": "successfully removed template: " + ontology_name
            }

            resp.body = json.dumps(result_json, ensure_ascii=False)
            resp.status = falcon.HTTP_200
