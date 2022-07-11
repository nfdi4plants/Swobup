import requests


class GeneralDownloader:
    def __init__(self, url):
        self.url = url

    def download_file(self):

        response = requests.get(self.url)
        file = response.content

        if response.status_code != 200:
            print("file could not be downloaded")
        else:
            file = response.content



        return file
