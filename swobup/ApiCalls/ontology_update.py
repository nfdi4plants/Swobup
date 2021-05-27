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

from ..helpers.message_collector import MessageCollector
from ..helpers.mail.mail_notifier import MailNotifier


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

        mail_server = config.get_config("mail-notifier", "server")
        mail_password = config.get_config("mail-notifier", "password")
        mail_sender = config.get_config("mail-notifier", "sender")
        mail_additional = config.get_config("mail-notifier", "additional_receiver")

        modified_files = body.get("head_commit").get("modified")
        added_files = body.get("head_commit").get("added")
        removed_files = body.get("head_commit").get("removed")
        repository_name = body.get("repository").get("full_name")
        commit_hash = body.get("head_commit").get("id")

        commit_user = body.get("head_commit").get("committer").get("name")
        commit_mail = body.get("head_commit").get("committer").get("email")
        github_username = body.get("head_commit").get("committer").get("username", "None")
        commit_url = body.get("head_commit").get("url")
        commit_message = body.get("head_commit").get("message", "None")
        commit_timestamp = body.get("head_commit").get("timestamp", "None")

        database = DatabaseConnector(db_host, db_user, db_password, db_name)
        message_collector = MessageCollector()

        files = modified_files + added_files

        for file in files:
            if ".obo" in file:

                message_collector.create_template_message(file)

                try:
                    github_downloader = GithubDownloader(repository_name)
                    mod_file = github_downloader.download_file(commit_hash, file).decode()
                    ontology_buffer = StringIO(mod_file)

                    obo_store = OboStore(ontology_buffer)
                    ontology_name = obo_store.get_ontology()

                    stored_terms = obo_store.get_storage()
                    # message_collector.add_template_info(file,
                    #                                    "INFO :Ontology file: <b>" + file
                    #                                    + "</b> downloaded successfully.")
                except Exception as e:
                    message_collector.add_template_error(file,
                                                         "ERROR : Error while downloading ontology file: <b>" + file
                                                         + "</b>.")
                    continue

                if not database.is_connected:
                    result_json = {
                        "status": "failed",
                        "message": "could not connect to database"
                    }

                    raise falcon.HTTPUnauthorized(result_json)

                if database.ontology_entry_exists(ontology_name):
                    try:
                        database.delete_ontology_row(ontology_name)
                    except Exception as e:
                        message_collector.add_template_error(file,
                                                             "ERROR : An previous version of the ontology <b>" + file
                                                             + "</b> could not be removed from database.")
                        continue

                try:
                    name = obo_store.get_name()
                except Exception as e:
                    message_collector.add_template_error(file,
                                                         "ERROR : No valid 'Name' field was defined "
                                                         "in the ontology file.")
                    continue
                try:
                    version = obo_store.get_version()
                except Exception as e:
                    message_collector.add_template_error(file,
                                                         "ERROR : No valid valid 'version' field was defined "
                                                         "in the ontology file.")
                    continue
                try:
                    author = obo_store.get_saved_by()
                except Exception as e:
                    message_collector.add_template_error(file,
                                                         "ERROR : No valid valid 'saved-by' field was defined "
                                                         "in the ontology file.")
                    continue

                timestamp = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
                database.insert_ontology(name, version, "", timestamp, author)
                message_collector.add_template_info(file,
                                                    "Ontology <b>" + ontology_name
                                                    + "</b> successfully created.")

                # not needed anymore
                # ontology_id = database.get_ontology_id(ontology_name)
                try:
                    obo_store.parse(ontology_name)
                except Exception as e:
                    message_collector.add_template_error(file,
                                                         "ERROR : Error reading the ontology "
                                                         "file: <b>" + file + "</b>.")

                # we delete the ontology row with cascade option, because of that this isn't required anymore
                # delete all terms with specific ontology_name
                # try:
                # database.delete_rows(ontology_name)
                #    database.delete_ontology_row(ontology_name)
                # except Exception as e:
                #    message_collector.add_template_error(file,
                #                                         "ERROR : An previous version of the ontology <b>" + file
                #                                         + "</b> could not be removed.")

                try:
                    # add new terms to ontology with specific ontology_name
                    database.insert_terms(stored_terms)
                    message_collector.add_template_info(file,
                                                        "Terms of the ontology <b>" + file
                                                        + "</b> successfully inserted into the database.")
                except Exception as e:
                    message_collector.add_template_error(file,
                                                         "ERROR : New Terms of the ontology <b>" + file
                                                         + "</b> could not be inserted into the database.")
                    # relationTerm Table
                # get reealtionDict
                stored_relationships = obo_store.get_storage()
                # print("stored", stored_relationships)

                for item in stored_relationships:
                    if item.get("is_a"):
                        for is_a in item.get("is_a"):
                            # if database.accession_to_id(item.get("Accession")) is None:
                            # rel_errors.append("Term has no ID in database: " + item.get("Accession"))

                            # if database.accession_to_id(is_a) is None:
                            # print("ISA", item.get("Accession --> " + is_a))
                            # rel_errors.append("TermRelated has no ID in database: " + is_a)

                            # insert term relationships without checks, this is faster
                            obo_store.add_rel(item.get("Accession"), is_a)

                            # uncomment this, if all terms with term check should be used
                            # search in all ontologies in database
                            # if database.accession_entry_exists(
                            #         item.get("Accession")) and database.accession_entry_exists(is_a):
                            #
                            #     # alternatively search only in local list for only current ontology after ids
                            #     # if obo_store.accession_in_storage(item.get("Accession")) and
                            #     # obo_store.accession_in_storage( is_a):
                            #
                            #     obo_store.add_rel(item.get("Accession"), is_a)
                            #     # message_collector.add_template_info(file, "INFO : Term relationships successfully
                            #     # inserted to the database.")
                            # else:
                            #     # print(str(item.get("Accession")) + "-->" + str(is_a))
                            #     message_collector.add_template_error(file,
                            #                                          "ERROR : The relationship.  <b>" + item.get(
                            #                                              "Accession") + " -> " + str(is_a)
                            #                                          + "</b> is no valid relation in the database.")

                insert_relations = obo_store.get_relstorage()

                #print("inserted relations", insert_relations)

                try:
                    database.insert_relterms(insert_relations, ontology_name)
                    # message_collector.add_template_info(file,
                    # "INFO : Term relationships successfully added to database.")
                    message_collector.add_template_info(file,
                                                        "Term relationships of ontology <b> " + ontology_name
                                                        + " </b> have been successfully added "
                                                          "to the database..")
                except Exception as e:
                    message_collector.add_template_error(file,
                                                         "ERROR : Some term relationships could not be inserted "
                                                         "into the database.")

        # if removed_files:
        # get id of last version
        before_commit_hash = body.get("before")
        for removed_file in removed_files:
            if ".obo" in removed_file:
                message_collector.create_template_message(removed_file)
                try:
                    github_downloader = GithubDownloader(repository_name)
                    obo_file = github_downloader.download_file(before_commit_hash, removed_file).decode()
                    ontology_buffer = StringIO(obo_file)

                except Exception as e:
                    message_collector.add_template_error(removed_file,
                                                         "ERROR : Error while downloading ontology file: <b>"
                                                         + removed_file + "</b>.")
                    continue

                obo_store = OboStore(ontology_buffer)
                ontology_name = obo_store.get_name()
                if ontology_name is None:
                    print("no name found")
                    message_collector.add_template_error(removed_file,
                                                         "ERROR : The ontology file  <b>" + removed_file
                                                         + "</b> does not have a defined name.")
                    continue
                else:
                    database.delete_ontology_row(ontology_name)
                    message_collector.add_template_info(removed_file,
                                                        "Ontology <b>" + ontology_name
                                                        + "</b> was successfully removed from database.")

        # send notifications as email

        mail_notifier = MailNotifier(mail_sender, commit_mail, mail_additional, mail_password, mail_server,
                                     github_username,
                                     commit_user, commit_mail, commit_url, commit_message, commit_hash,
                                     commit_timestamp)

        messages = message_collector.get_messages()

        for message in messages:

            mail_notifier.add_headline(message)
            infos = message_collector.get_infos(message)
            errors = message_collector.get_errors(message)
            mail_notifier.add_message_table_start()
            for info in infos:
                mail_notifier.add_message_line(info)
            for error in errors:
                mail_notifier.add_message_line(error)
            mail_notifier.add_message_table_end()

        mail_message = mail_notifier.build_mail(repository_name)
        mail_notifier.send_mail(mail_message)

        result_json = {
            "status": "status: " + "job done"
        }

        resp.body = json.dumps(result_json, ensure_ascii=False)
        resp.status = falcon.HTTP_200
