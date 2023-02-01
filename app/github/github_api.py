import requests


class GithubAPI:
    def __init__(self, repository_name):
        self.repository_name = repository_name
        # self.branch = branch

    def get_master_tree(self, branch):
        # headers = {'Authorization': 'token ' + self.auth_token,
        #            'Accept': 'application/vnd.github.v3.raw'
        #            }

        url = "https://api.github.com/repos/{}/git/trees/{}?recursive=1".format(self.repository_name, branch)

        # if self.auth_token != "":
        #     headers = {'Authorization': 'token ' + self.auth_token,
        #                'Accept': 'application/vnd.github.v3.raw'
        #                }

        try:
            response = requests.get(url)
            response.raise_for_status()
        except requests.exceptions.HTTPError as err:
            print("status code: ", response.status_code)
            print(response.json().get("message"))

        result = response.json()

        print("result", result)

        # for file in result["tree"]:
        #    print(file["path"], file["sha"])

        return result

    def convert_to_raw_url(self, file_name, branch):
        full_name = self.repository_name
        # branch = self.branch

        base_url = "https://raw.githubusercontent.com/%s/%s/%s" % (full_name, branch, file_name)

        return base_url


if __name__ == "__main__":
    github_api = GithubAPI("nfdi4plants/nfdi4plants_ontology")

    tree = github_api.get_master_tree("main").get("tree")

    print("tree", tree)

    for file in tree:
        print(github_api.convert_to_raw_url(file.get("path"), "main"))
