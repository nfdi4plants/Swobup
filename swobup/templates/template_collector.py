import xml.dom.minidom
import json

from zipfile import ZipFile

from io import StringIO
from io import BytesIO

from ..helpers.gitHub_downloader import GithubDownloader
from ..templates.template_store import TemplateStore

from ..helpers.message_collector import MessageCollector


# collect added/modified or removed templates
# ignores templates without json file
class TemplateCollector:
    def __init__(self, modified_files):
        self.template_store = TemplateStore()

        self.template_folders = []
        self.file_list = []
        self.collect_files(modified_files)

    def collect_files(self, modified_files):
        for added_file in modified_files:
            folder = added_file.rsplit('/', 1)[0]
            file = added_file.rsplit('/', 1)[1]
            if folder not in self.template_folders:
                self.template_folders.append(folder)

            folder_index = self.template_folders.index(folder)

            if len(self.file_list) - 1 < folder_index:
                file_list = [file]
                self.file_list.append(file_list)
            else:
                self.file_list[folder_index].append(file)

    def get_template_folders(self):
        return self.template_folders

    def get_files_list(self):
        return self.file_list

    def get_collection(self):
        return self.template_store

    def create_template_object(self, meta_json):
        self.template_store.create_template_object(meta_json)

    def parse_xslx(self, xlsx_buffer, template_folder):
        with ZipFile(xlsx_buffer) as zip_archive:
            tables_xml = zip_archive.read('customXml/item1.xml').decode()
            table_buffer = StringIO(tables_xml)

            doc = xml.dom.minidom.parse(table_buffer)
            swate_tables = doc.getElementsByTagName("SwateTable")

            for name in swate_tables:
                table_name = name.getAttribute("Table")
                table_xml = name.toxml()

                self.template_store.add_custom_xml(table_xml, table_name, template_folder)

            namelist = zip_archive.namelist()

            table_xml_names = []
            for name in namelist:
                if "xl/tables" in name:
                    table_xml_names.append(name)

            for name in table_xml_names:
                table_xml = zip_archive.read(name).decode()
                fake_file = StringIO(table_xml)

                doc = xml.dom.minidom.parse(fake_file)
                name = doc.getElementsByTagName("table")

                xml_document = doc.toxml()

                for n in name:
                    table_name = n.getAttribute("name")

                self.template_store.add_template_xml(xml_document, table_name, template_folder)

    # old method TODO: delete
    def collect(self, added_files, repository_name, commit_hash):

        # message_collector = MessageCollector()

        # template_store = TemplateStore()
        template_folders = []
        file_lists = []

        for added_file in added_files:
            folder = added_file.rsplit('/', 1)[0]
            file = added_file.rsplit('/', 1)[1]
            if folder not in template_folders:
                folder_dict = {}
                template_folders.append(folder)

            folder_index = template_folders.index(folder)

            if len(file_lists) - 1 < folder_index:
                file_list = [file]
                file_lists.append(file_list)
            else:
                file_lists[folder_index].append(file)

        # here

        for template_folder in template_folders:
            print("====")
            print("template_folder", template_folder)
            print("====")

            current_index = template_folders.index(template_folder)
            current_fileslist = file_lists[current_index]

            for file in current_fileslist:
                print("---")
                print("file", file)
                print("---")

                if ".json" in file:
                    try:
                        github_downloader = GithubDownloader(repository_name)

                        current_json = github_downloader.download_file(commit_hash, template_folder + "/"
                                                                       + file)
                        print("current_json", current_json)

                        meta_json = json.loads(github_downloader.download_file(commit_hash, template_folder + "/"
                                                                               + file))

                        meta_json["template_folder"] = template_folder
                    except Exception as e:
                        print("fehler in parsing json", current_json)
                        # message_collector.add_error("Json file " +file +" not well formatted.")
                        MessageCollector.error_messages.append("Json file " + file + " not well formatted.")
                        print("voll", MessageCollector.error_messages)
                        continue

                    self.template_store.create_template_object(meta_json)

        # here

        for template_folder in template_folders:
            current_index = template_folders.index(template_folder)
            current_fileslist = file_lists[current_index]

            for file in current_fileslist:
                if ".xlsx" in file:
                    github_downloader = GithubDownloader(repository_name)
                    xslx_file = github_downloader.download_file(commit_hash, template_folder + "/" + file)

                    xlsx_buffer = BytesIO(xslx_file)

                    with ZipFile(xlsx_buffer) as zip_archive:
                        tables_xml = zip_archive.read('customXml/item1.xml').decode()
                        table_buffer = StringIO(tables_xml)

                        doc = xml.dom.minidom.parse(table_buffer)
                        swate_tables = doc.getElementsByTagName("SwateTable")

                        for name in swate_tables:
                            table_name = name.getAttribute("Table")
                            table_xml = name.toxml()

                            self.template_store.add_custom_xml(table_xml, table_name, template_folder)

                        namelist = zip_archive.namelist()

                        table_xml_names = []
                        for name in namelist:
                            if "xl/tables" in name:
                                table_xml_names.append(name)

                        for name in table_xml_names:
                            table_xml = zip_archive.read(name).decode()
                            fake_file = StringIO(table_xml)

                            doc = xml.dom.minidom.parse(fake_file)
                            name = doc.getElementsByTagName("table")

                            xml_document = doc.toxml()

                            for n in name:
                                table_name = n.getAttribute("name")

                            self.template_store.add_template_xml(xml_document, table_name, template_folder)

        return self.template_store
