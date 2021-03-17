import falcon
import json
import datetime

from ..helpers.configurator import Configurator
from ..helpers.gitHub_downloader import GithubDownloader

from ..helpers.database.database_connector import *

from ..helpers.request_store import RequestStore

from ..templates.template_collector import TemplateCollector


class TemplateUpdate(object):
    def on_post(self, req, resp):
        # database handler should be in a middleware in a future version

        config = Configurator("swobup/config/config.conf")

        body = json.loads(RequestStore.body)

        db_host = config.get_config("database", "host")
        db_user = config.get_config("database", "user")
        db_password = config.get_config("database", "password")
        db_name = config.get_config("database", "dbname")

        modified_files = body.get("head_commit").get("modified")
        added_files = body.get("head_commit").get("added")
        # added_files = list(map(lambda x: x.lower(), body.get("head_commit").get("added")))
        removed_files = body.get("head_commit").get("removed")
        repository_name = body.get("repository").get("full_name")
        commit_hash = body.get("head_commit").get("id")
        # tree_hash = body.get("head_commit").get("tree_id")
        # timestamp = body.get("head_commit").get("timestamp")
        timestamp = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

        database = DatabaseConnector(db_host, db_user, db_password, db_name)
        # template_store = TemplateStore()

        if added_files:
            template_collector = TemplateCollector()

            collection = template_collector.collect(added_files, repository_name, commit_hash)

            template_collection = collection.get_template_store()

            for temp in template_collection:

                if database.protocol_entry_exists(temp.get_name()):
                    print("Protocol Entry already exists, skipping...")
                    logging.info("Protocol Entry already exists, skipping...")
                    continue

                database.insert_protocol(temp.get_name(), temp.get_version(), temp.get_author(), temp.get_description(),
                                         temp.get_docsLink(), temp.get_tags_as_string(), timestamp, 0, 0)

                # create TableXml
                table_xml = temp.get_table_xml()

                database.insert_protocol_xml(temp.get_name(), "TableXml", table_xml)

                # create CustomXml

                custom_xml = temp.get_custom_xml()
                database.insert_protocol_xml(temp.get_name(), "CustomXml", custom_xml)

            result_json = {
                "status": "success"
            }

            resp.body = json.dumps(result_json, ensure_ascii=False)
            resp.status = falcon.HTTP_200

        if modified_files:
            template_collector = TemplateCollector()

            collection = template_collector.collect(modified_files, repository_name, commit_hash)
            template_collection = collection.get_template_store()

            for template in template_collection:
                database.update_protocol(template.get_name(), template.get_version(), template.get_author(),
                                         template.get_description(), template.get_docsLink(),
                                         template.get_tags_as_string(), timestamp)

                table_xml = template.get_table_xml()

                # create TableXml
                if table_xml:
                    # if entry exists in database, update it, else insert
                    print("table XML")
                    if database.protocolxml_entry_exists(template.get_name(), "TableXml"):
                        print("table update")
                        database.update_protocol_xml(template.get_name(), "TableXml", table_xml)
                    else:
                        print("table xml insert")
                        database.insert_protocol_xml(template.get_name(), "TableXml", table_xml)

                # create CustomXml
                custom_xml = template.get_custom_xml()

                if custom_xml:
                    print("custom XML")
                    # if entry exists in database, update it, else insert
                    if database.protocolxml_entry_exists(template.get_name(), "CustomXml"):
                        print("custom xml update")
                        database.update_protocol_xml(template.get_name(), "CustomXml", custom_xml)
                    else:
                        print("custom xml insert")
                        database.insert_protocol_xml(template.get_name(), "CustomXml", custom_xml)

            result_json = {
                "status": "success"
            }

            resp.body = json.dumps(result_json, ensure_ascii=False)
            resp.status = falcon.HTTP_200

        if removed_files:
            # get id of last version
            before_commit_hash = body.get("before")
            for removed_file in removed_files:
                if ".json" in removed_file:
                    github_downloader = GithubDownloader(repository_name)
                    meta_json = json.loads(github_downloader.download_file(before_commit_hash, removed_file))
                    current_name = meta_json.get("name", "None")
                    if current_name is None:
                        print("no name found")
                        continue
                    else:
                        database.delete_protocol_row(current_name)

            result_json = {
                "status": "successfully removed template: " +current_name
            }

            resp.body = json.dumps(result_json, ensure_ascii=False)
            resp.status = falcon.HTTP_200
