import requests


class SwateAPI:
    def __init__(self, backend_url):
        self.backend_url = backend_url
        self.headers = {"Content-Type":"application/octet-stream"}

    def convert_xslx(self, file):
        url = self.backend_url + "/api/IISADotNetCommonAPIv1/toSwateTemplateJson"

        response = requests.post(url, data= file, headers=self.headers)

        print("url", url)
        print("response", response)

        response_json = response.json()

        return response_json
