import os

import requests


class SwateAPI:
    def __init__(self):
        # self.backend_url = backend_url
        self.backend_url = os.getenv("SWATE_API", "https://swate.nfdi4plants.org")

        self.headers = {"Content-Type": "application/octet-stream"}

    def convert_xslx(self, file):
        url = self.backend_url + "/api/IISADotNetCommonAPIv1/toSwateTemplateJson"

        response = requests.post(url, data=file, headers=self.headers)

        print("url", url)
        print("response", response)

        response_json = response.json()

        return response_json


    def get_swate_version(self):
        url = self.backend_url + "/api/IServiceAPIv1/getAppVersion"

        print("url", url)

        response = requests.get(url)

        if response.status_code == 200:

            response_json = response.json()
        else:
            response_json = "none"

        return response_json
