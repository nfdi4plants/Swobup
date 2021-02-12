import configparser
import sys
import logging


class Configurator:
    def __init__(self, file):

        self.config_dict = dict()
        self.read_config(file)

    def read_config(self, file):
        config = configparser.ConfigParser()

        config.read(file)
        self.validate_config(config)

        for section in config.sections():
            self.config_dict[section] = {}

            for key in config[section]:
                self.config_dict[section][key] = config[section][key]

    def get_config(self, key, attribute):
        output = self.config_dict.get(key).get(attribute)

        return output

    def validate_config(self, config):
        # check if keys has variables
        for section in config.sections():
            for key in config[section]:
                if not config[section][key]:
                    logging.error("The parameter " + "\033[1m" + key + "\033[0m" + " has no value in config file")
                    sys.exit(1)
                    break

