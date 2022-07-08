import requests


class GitHubDownloader:
    def __init__(self, filename, repository_name, commit_hash):
        self.filename = filename
        self.repository_name = repository_name
        self.commit_hash = commit_hash
        self.download_path = 'https://raw.githubusercontent.com'

    def download_file(self):
        location = self.download_path + "/" + self.repository_name + "/" + self.commit_hash + "/" + self.filename

        print("downloading : ", location)

        response = requests.get(location, stream=True)
        file = None

        if response.status_code != 200:
            print("file could not be downloaded")
        else:
            file = response.raw

        return file
