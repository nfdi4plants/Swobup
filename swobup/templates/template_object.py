import json


class TemplateObject(object):
    def __init__(self, meta_json):
        self.name = ""
        self.version = ""
        self.author = ""
        self.description = ""
        self.docslink = ""
        self.tags = []
        self.workbook = ""
        self.worksheet = ""
        self.table = ""
        self.template_folder = ""

        self.tableXML = ""
        self.customXML = ""

        self.parse_json(meta_json)

    def parse_json(self, meta_json):
        self.name = meta_json.get("name")
        self.version = meta_json.get("version")
        self.author = meta_json.get("author")
        self.description = meta_json.get("description")
        self.docslink = meta_json.get("docslink")
        self.workbook = meta_json.get("Workbook")
        self.worksheet = meta_json.get("Worksheet")
        self.table = meta_json.get("Table")

        self.template_folder = meta_json.get("template_folder")

        for tag in meta_json.get("tags"):
            self.tags.append(tag)

    def add_custom_xml(self, xml):
        self.customXML = xml

    def add_table_xml(self, xml):
        self.tableXML = xml

    def get_name(self):
        return self.name

    def get_version(self):
        return self.version

    def get_author(self):
        if isinstance(self.author, list):
            author = ",".join(self.author)
            return author
        else:
            return self.author

    def get_description(self):
        return self.description

    def get_docsLink(self):
        return self.docslink

    def get_tags_as_string(self):
        tags = ";".join(self.tags)
        return tags

    def get_table_name(self):
        return self.table

    def get_table_xml(self):
        return self.tableXML

    def get_custom_xml(self):
        return self.customXML

    def get_template_folder(self):
        return self.template_folder

    def get_worksheet(self):
        return self.worksheet