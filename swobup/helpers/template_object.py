import json

class TemplateObject(object):
    def __init__(self,  meta_json):
        self.name = ""
        self.version = ""
        self.author = ""
        self.description = ""
        self.docslink = ""
        self.tags = []
        self.workbook = ""
        self.worksheet = ""
        self.table = ""

        self.tableXML = ""
        self.customXML = ""

        self.parse_json(meta_json)


    def parse_json(self, meta_json):
        self.name = meta_json.get("name")
        self.version = meta_json.get("version")
        self.author = meta_json.get("author")
        self.description = meta_json.get("description")
        self.docslink = meta_json.get("docslink")
        self.workbook = meta_json.get("workbook")
        self.worksheet = meta_json.get("worksheet")
        self.table = meta_json.get("Table")

        for tag in meta_json.get("tags"):
            self.tags.append(tag)

    def add_custom_xml(self, xml):
        pass

    def add_table_xml(self,xml):
        pass

    def get_name(self):
        return self.name

    def get_table_name(self):
        return self.table



