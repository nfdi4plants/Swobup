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

        response = requests.get(location)
        file = response.content

        if response.status_code != 200:
            print("file could not be downloaded")
        else:
            file = response.content

        return file

    def get_master_tree(self, repository_name, branch):
        # headers = {'Authorization': 'token ' + self.auth_token,
        #            'Accept': 'application/vnd.github.v3.raw'
        #            }

        url = "https://api.github.com/repos/{}/git/trees/{}?recursive=1".format(repository_name, branch)

        # if self.auth_token != "":
        #     headers = {'Authorization': 'token ' + self.auth_token,
        #                'Accept': 'application/vnd.github.v3.raw'
        #                }

        response = requests.get(url)

        result = response.json()

        print("result", result)

        # for file in result["tree"]:
        #    print(file["path"], file["sha"])

        return result
