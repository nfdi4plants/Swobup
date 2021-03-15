import xml.dom.minidom
import json

from zipfile import ZipFile

from io import StringIO
from io import BytesIO

from ..helpers.gitHub_downloader import GithubDownloader
from ..templates.template_store import TemplateStore


# collect added/modified or removed templates
# ignores templates without json file
class TemplateCollector:
    def __init__(self):
        self.template_store = TemplateStore()

    def collect(self, added_files, repository_name, commit_hash):
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

        for template_folder in template_folders:
            current_index = template_folders.index(template_folder)
            current_fileslist = file_lists[current_index]

            for file in current_fileslist:

                if ".json" in file:
                    github_downloader = GithubDownloader(repository_name)
                    meta_json = json.loads(github_downloader.download_file(commit_hash, template_folder + "/" + file))
                    meta_json["template_folder"] = template_folder

                    self.template_store.create_template_object(meta_json)

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
