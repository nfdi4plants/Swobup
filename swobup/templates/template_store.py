import xml.dom.minidom
import logging

from ..templates.template_object import TemplateObject


class TemplateStore:
    def __init__(self):
        self.template_store = []

    # create a template and store in template_store
    def create_template_object(self, object_file):
        try:
            template_object = TemplateObject(object_file)
            # print("\033[94m temp obj \033[0m",template_object)
            # print("\033[94m temp obj \033[0m", template_object.get_name())
            self.template_store.append(template_object)
        except:
            logging.info("could not create template from json", object_file)

    # method to add a custom_xml
    def add_custom_xml(self, custom_xml, table_name, template_folder):
        for template in self.template_store:
            if template.get_table_name() == table_name and (template.get_template_folder() == template_folder):
                # print("\033[94m found: \033[0m", template.get_name())
                template.add_custom_xml(custom_xml)
                break

    # method to add a template xml to a template_object
    def add_template_xml(self, template_xml, table_name, template_folder):
        for template in self.template_store:
            # print("\033[94m template \033[0m", template.get_table_name())
            if (template.get_table_name() == table_name) and (template.get_template_folder() == template_folder):
                # print("\033[94m found2: \033[0m", template.get_table_name())
                # print("table_name", table_name)
                template.add_table_xml(template_xml)
                # print("table added")
                break

    def get_template_store(self):
        return self.template_store


    def get_template_worksheet(self, template_folder):
        for template in self.template_store:
            if template.get_template_folder() == template_folder:
                return template.get_worksheet()