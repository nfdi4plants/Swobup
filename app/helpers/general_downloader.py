import requests


class GeneralDownloader:
    def __init__(self, url):
        self.url = url

    def download_file(self):

        response = requests.get(self.url, stream=True)

        response.raw.decode_content = True
        response.raw.auto_close = False

        # file = response.content

        file = response.raw

        if response.status_code != 200:
            print("file could not be downloaded")
        else:
            file = response.raw



        return file
