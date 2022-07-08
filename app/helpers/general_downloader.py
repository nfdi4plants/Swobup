import requests

from requests.structures import CaseInsensitiveDict


class GeneralDownloader:
    def __init__(self, url):
        self.url = url

    def download_file(self):

        headers = CaseInsensitiveDict()
        headers["Accept-Encoding"] = "identity"

        response = requests.get(self.url, stream=True, headers=headers)
        print(response.headers)
        file = response.raw

        if response.status_code != 200:
            print("file could not be downloaded")
        else:
            file = response.raw

        return file
