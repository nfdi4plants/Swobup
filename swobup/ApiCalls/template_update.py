import falcon
import json
import datetime

from io import BytesIO

import sys

from ..helpers.configurator import Configurator
from ..helpers.gitHub_downloader import GithubDownloader

from ..helpers.database.database_connector import *

from ..helpers.request_store import RequestStore

from ..templates.template_collector import TemplateCollector

from ..helpers.message_collector import MessageCollector

from ..templates.template_store import TemplateStore

from ..helpers.mail.mail_notifier import MailNotifier


class TemplateUpdate(object):

    def on_post(self, req, resp):
        # database handler should be in a middleware in a future version

        config = Configurator("swobup/config/config.conf")

        message_collector = MessageCollector()

        template_store = TemplateStore()

        # message_collector.cleanup()

        body = json.loads(RequestStore.body)

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
        # added_files = list(map(lambda x: x.lower(), body.get("head_commit").get("added")))
        removed_files = body.get("head_commit").get("removed")
        repository_name = body.get("repository").get("full_name")
        commit_hash = body.get("head_commit").get("id")
        # tree_hash = body.get("head_commit").get("tree_id")
        # timestamp = body.get("head_commit").get("timestamp")
        timestamp = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

        pusher_user = body.get("pusher").get("name")
        pusher_mail = body.get("pusher").get("email")

        commit_user = body.get("head_commit").get("committer").get("name")
        commit_mail = body.get("head_commit").get("committer").get("email")
        github_username = body.get("head_commit").get("committer").get("username", "None")
        commit_url = body.get("head_commit").get("url")

        database = DatabaseConnector(db_host, db_user, db_password, db_name)
        # template_store = TemplateStore()

        # TODO: combine added_files and modified_files parts

        if added_files:
            print("added_files", added_files)
            template_collector = TemplateCollector(added_files)

            template_folders = template_collector.get_template_folders()
            file_lists = template_collector.get_files_list()

            print("template_folders", template_folders)

            for template_folder in template_folders:
                # create message for template
                message_collector.create_template_message(template_folder)

                current_index = template_folders.index(template_folder)
                current_fileslist = file_lists[current_index]

                json_available = [item for item in current_fileslist if ".json" in item]

                if json_available:
                    file = json_available[0]

                    try:
                        github_downloader = GithubDownloader(repository_name)

                        current_json = github_downloader.download_file(commit_hash, template_folder + "/"
                                                                       + file)

                    except Exception as e:
                        message = "ERROR: An error occurred while downloading the JSON meta file.\n"
                        message_collector.add_template_error(template_folder, message)
                        continue

                    try:
                        meta_json = json.loads(current_json)

                        meta_json["template_folder"] = template_folder

                        # create new template object
                        # template_store.create_template_object(meta_json)

                        message = "JSON meta file in folder " + "<b>" + template_folder + "</b>" + " is valid."
                        message_collector.add_template_info(template_folder, message)

                        template_collector.create_template_object(meta_json)

                    except Exception as e:
                        message = "ERROR: An error occurred while parsing the JSON meta file.\n " \
                                  "Please check the file for errors."
                        message_collector.add_template_error(template_folder, message)
                        continue

                    # current_index = template_folders.index(template_folder)
                    # current_fileslist = file_lists[current_index]

                    for file in current_fileslist:
                        if ".xlsx" in file:

                            try:
                                github_downloader = GithubDownloader(repository_name)
                                xslx_file = github_downloader.download_file(commit_hash, template_folder + "/" + file)

                            except Exception as e:

                                message = "ERROR: An error occurred while downloading the XSLX file " + file + " .\n "
                                message_collector.add_template_error(template_folder, message)
                                continue

                            try:
                                xlsx_buffer = BytesIO(xslx_file)

                                template_collector.parse_xslx(xlsx_buffer, template_folder)
                            except Exception as e:

                                message = "ERROR: An error occurred while downloading the XSLX file " \
                                          + file + " .\n Please check the file for errors. "

                                message_collector.add_template_error(template_folder, message)
                                continue

                else:
                    message = "ERROR: There is no JSON in template folder, please add a meta JSON file " \
                              "and re-commit it. \n"
                    message_collector.add_template_error(template_folder, message)
                    continue

            # collection = template_collector.collect(added_files, repository_name, commit_hash)

            collection = template_collector.get_collection()

            template_collection = collection.get_template_store()

            for temp in template_collection:

                if database.protocol_entry_exists(temp.get_name()):
                    print("Protocol Entry already exists, skipping...")
                    logging.info("Protocol Entry already exists, skipping...")
                    message = "ERROR: The template " + "<b>" + temp.get_name() + "</b>" + " already exists in " \
                                                                                          "database, skipping ... \n "
                    message_collector.add_template_error(temp.template_folder, message)
                    continue

                try:
                    database.insert_protocol(temp.get_name(), temp.get_version(), temp.get_author(),
                                             temp.get_description(), temp.get_docsLink(), temp.get_tags_as_string(),
                                             timestamp, 0, 0)
                except Exception as e:
                    message = "ERROR: An error occurred while inserting the template " + temp.get_name() \
                              + " to the Swate database. \n"
                    message_collector.add_template_error(temp.template_folder, message)

                try:
                    # create TableXml
                    table_xml = temp.get_table_xml()

                    # print("insert tablexml")
                    database.insert_protocol_xml(temp.get_name(), "TableXml", table_xml)

                except Exception as e:
                    message = "ERROR: An error occurred while inserting the table XML of" + temp.get_name() + "\n"
                    message_collector.add_template_error(temp.template_folder, message)

                # create CustomXml
                try:
                    custom_xml = temp.get_custom_xml()
                    database.insert_protocol_xml(temp.get_name(), "CustomXml", custom_xml)

                except Exception as e:
                    message = "ERROR: An error occurred while inserting the custom XML of " + temp.get_name() + "\n"
                    message_collector.add_template_error(temp.template_folder, message)

                message = "The template: <b>" + temp.get_name() + "</b> was successfully added to the Swate " \
                                                                  "database. \n "
                message_collector.add_template_info(temp.template_folder, message)

        if modified_files:
            template_collector = TemplateCollector(modified_files)

            # collection = template_collector.collect(modified_files, repository_name, commit_hash)

            collection = template_collector.get_collection()
            template_collection = collection.get_template_store()

            template_folders = template_collector.get_template_folders()
            file_lists = template_collector.get_files_list()

            for template_folder in template_folders:

                message_collector.create_template_message(template_folder)

                current_index = template_folders.index(template_folder)
                current_fileslist = file_lists[current_index]

                json_available = [item for item in current_fileslist if ".json" in item]

                if json_available:
                    file = json_available[0]

                    try:
                        github_downloader = GithubDownloader(repository_name)

                        current_json = github_downloader.download_file(commit_hash, template_folder + "/"
                                                                       + file)

                    except Exception as e:
                        message = "ERROR: An error occurred while downloading the JSON meta file.\n"
                        message_collector.add_template_error(template_folder, message)
                        continue

                    try:
                        meta_json = json.loads(current_json)

                        meta_json["template_folder"] = template_folder

                        # create new template object
                        # template_store.create_template_object(meta_json)

                        message = "INFO: JSON meta file in folder " + "<b>" + template_folder + "</b>" + " is valid."
                        message_collector.add_template_info(template_folder, message)

                        template_collector.create_template_object(meta_json)

                    except Exception as e:
                        message = "ERROR: An error occurred while parsing the JSON metafile.\n " \
                                  "Please check the file for errors."
                        message_collector.add_template_error(template_folder, message)
                        continue

                    for file in current_fileslist:
                        if ".xlsx" in file:

                            try:
                                github_downloader = GithubDownloader(repository_name)
                                xslx_file = github_downloader.download_file(commit_hash,
                                                                            template_folder + "/" + file)

                            except Exception as e:

                                message = "ERROR: An error occurred while downloading the XSLX file " + file + " .\n "
                                message_collector.add_template_error(template_folder, message)
                                continue

                            try:
                                xlsx_buffer = BytesIO(xslx_file)

                                template_collector.parse_xslx(xlsx_buffer, template_folder)
                            except Exception as e:

                                message = "ERROR: An error occurred while downloading the XSLX file " + file + " .\n " \
                                                                                                               "Please check " \
                                                                                                               "the file for " \
                                                                                                               "errors. "
                                message_collector.add_template_error(template_folder, message)
                                continue

                else:
                    message = "ERROR: There is no JSON in template folder, please add a meta JSON file " \
                              "and re-commit it. \n"
                    message_collector.add_template_error(template_folder, message)
                    continue

            collection = template_collector.get_collection()

            template_collection = collection.get_template_store()

            for template in template_collection:

                try:

                    database.update_protocol(template.get_name(), template.get_version(), template.get_author(),
                                             template.get_description(), template.get_docsLink(),
                                             template.get_tags_as_string(), timestamp)

                except Exception as e:
                    message = "ERRROR: An error occurred while updating the template " + template.get_name() \
                              + " to the Swate database. \n"
                    message_collector.add_template_error(template.template_folder, message)

                try:

                    table_xml = template.get_table_xml()

                    # if entry exists in database, update it, else insert
                    print("table XML")
                    if database.protocolxml_entry_exists(template.get_name(), "TableXml"):
                        print("table update")
                        database.update_protocol_xml(template.get_name(), "TableXml", table_xml)
                    else:
                        print("table xml insert")
                        database.insert_protocol_xml(template.get_name(), "TableXml", table_xml)

                except Exception as e:
                    message = "ERROR: An error occurred while updating table XML of" + template.get_name() + "\n"
                    message_collector.add_template_error(template.template_folder, message)

                try:

                    # create CustomXml
                    custom_xml = template.get_custom_xml()

                    print("custom XML")
                    # if entry exists in database, update it, else insert
                    if database.protocolxml_entry_exists(template.get_name(), "CustomXml"):
                        print("custom xml update")
                        database.update_protocol_xml(template.get_name(), "CustomXml", custom_xml)
                    else:
                        print("custom xml insert")
                        database.insert_protocol_xml(template.get_name(), "CustomXml", custom_xml)

                except Exception as e:
                    message = "ERROR: An error occurred while inserting the Custom XML of " + template.get_name() + "\n"
                    message_collector.add_template_error(template.template_folder, message)

                message = "The template <b>" + template.get_name() + "</b> was successfully updated in Swate " \
                                                                     "database. \n "
                message_collector.add_template_info(template.template_folder, message)

            # result_json = {
            #    "status": "success"
            # }

            # resp.body = json.dumps(result_json, ensure_ascii=False)
            # resp.status = falcon.HTTP_200

        if removed_files:
            # get id of last version
            before_commit_hash = body.get("before")

            template_collector = TemplateCollector(removed_files)

            template_folders = template_collector.get_template_folders()
            file_lists = template_collector.get_files_list()

            print("removing")

            for template_folder in template_folders:

                current_index = template_folders.index(template_folder)
                current_fileslist = file_lists[current_index]

                message_collector.create_template_message(template_folder)

                json_available = [item for item in current_fileslist if ".json" in item]

                if json_available:
                    file = json_available[0]
                    print("downloading...", file)
                    current_name = ""
                    try:
                        github_downloader = GithubDownloader(repository_name)
                        meta_json = json.loads(github_downloader.download_file(before_commit_hash, file))
                        print("meta_json", meta_json)
                        current_name = meta_json.get("name", "None")
                    except Exception as e:
                        message = "An error occurred while parsing the JSON meta file.\n " \
                                  "Please check the file for errors."
                        message_collector.add_template_error(template_folder, message)
                    if current_name is None:
                        print("no name found")
                        message = "The JSON file has defined no template name.\n "
                        message_collector.add_template_error(template_folder, message)
                        continue
                    else:
                        try:
                            if database.protocol_entry_exists(current_name):
                                database.delete_protocol_row(current_name)
                                message = "Template " + current_name \
                                          + " was successfully removed from Swate database. \n"
                                message_collector.add_template_info(template_folder, message)
                                print("success")
                        except Exception as e:
                            message = "An error occurred while deleting the template " + current_name + " .\n "
                            message_collector.add_template_error(template_folder, message)
                            print("error")

        # send notifications as email
        mail_notifier = MailNotifier(mail_sender, commit_mail, mail_additional, mail_password, mail_server,
                                     github_username,
                                     commit_user, commit_mail, commit_url)

        template_messages = message_collector.get_messages()

        for template in template_messages:
            mail_notifier.add_headline(template)
            infos = message_collector.get_infos(template)
            errors = message_collector.get_errors(template)
            for info in infos:
                mail_notifier.add_message_line(info)
            for error in errors:
                mail_notifier.add_message_line(error)

        mail_message = mail_notifier.build_mail(repository_name)
        mail_notifier.send_mail(mail_message)

        # return HTTP response

        result_json = {
            "status": "job done"
            # "error": message_collector.get_error_messages()
        }

        # message_collector.cleanup()
        resp.body = json.dumps(result_json, ensure_ascii=False)
        resp.status = falcon.HTTP_200
