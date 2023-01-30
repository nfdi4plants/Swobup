import os

import requests


class SwateAPI:
    def __init__(self):
        # self.backend_url = backend_url
        self.backend_url = os.getenv("SWATE_API", "https://swate.nfdi4plants.org")

        self.headers = {"Content-Type": "application/octet-stream"}
        self.verify: True
        if bool(os.getenv("TURN_OFF_SSL_VERIFY")):
            self.verify = False
            print("verification turned off")
        else:
            self.verify = True
            print("verification turned on")

    def convert_xslx(self, file):
        url = self.backend_url + "/api/IISADotNetCommonAPIv1/toSwateTemplateJson"

        try:
            response = requests.post(url, data=file, headers=self.headers, verify=self.verify)
            response.raise_for_status()
        except requests.exceptions.HTTPError as errh:
            print("Http Error:", errh)
        except requests.exceptions.ConnectionError as errc:
            print("Error Connecting:", errc)
        except requests.exceptions.Timeout as errt:
            print("Timeout Error:", errt)
        except requests.exceptions.RequestException as err:
            print("OOps: Something Else", err)

        response_json = response.json()

        return response_json

    def get_swate_version(self):
        url = self.backend_url + "/api/IServiceAPIv1/getAppVersion"

        print("url", url)

        response = requests.get(url, verify=self.verify)

        if response.status_code == 200:

            response_json = response.json()
        else:
            response_json = "none"

        return response_json
