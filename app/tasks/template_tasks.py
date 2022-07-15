import io

import obonet
import networkx
import datetime
import sys
import pandas as pd
from io import StringIO

from tasks import app
from app.github.webhook_payload import PushWebhookPayload
from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser

from app.helpers.general_downloader import GeneralDownloader
from app.helpers.swate_api import SwateAPI

from app.helpers.models.templates.template import Template

from resource import *

@app.task
def add_template_custom(url):

    swate_url = "https://swate.nfdi4plants.de"

    general_downloader = GeneralDownloader(url)
    current_file = general_downloader.retrieve_xslx()

    print("current file", current_file)

    swate_api = SwateAPI(swate_url)

    converted_json = swate_api.convert_xslx(current_file)

    print("converted_json", converted_json)

    template = Template.parse_obj(converted_json)

    print("t", template)


