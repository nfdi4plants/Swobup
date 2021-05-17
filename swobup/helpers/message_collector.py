class TemplateMessageObject:
    def __init__(self, template_folder):
        self.template_name = template_folder
        self.info_messages = []
        self.error_messages = []
        self.is_template = True

    def add_error(self, message):
        self.error_messages.append(message)

    def add_info(self, message):
        self.info_messages.append(message)

    def get_info(self):
        return self.info_messages

    def get_error(self):
        return self.error_messages


class MessageCollector:

    def __init__(self):
        self.template_messages = {}

    def create_template_message(self, template_folder):
        template_message = TemplateMessageObject(template_folder)
        self.template_messages[template_message.template_name] = template_message

    def add_template_error(self, template_folder, message):
        self.template_messages[template_folder].add_error(message)


    def add_template_info(self, template_folder, message):
        self.template_messages[template_folder].add_info(message)

    def get_errors(self, template_folder):
        return self.template_messages[template_folder].get_error()

    def get_infos(self, template_folder):
        return self.template_messages[template_folder].get_info()

    def get_messages(self):
        return self.template_messages

    def get_error_messages(self):
        return self.error_messages

    def cleanup(self):
        # self.error_messages = []
        # self.messages = []

        print("cleaning")
        self.error_messages[:]
        self.messages[:]
