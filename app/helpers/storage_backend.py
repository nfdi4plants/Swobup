import json
import os

from os import path

from celery.backends.s3 import S3Backend

from tasks import app
from pathlib import Path


class LocalStorage:
    def __init__(self):
        self.storage_dir = "localstorage"
        Path(self.storage_dir).mkdir(exist_ok=True)
        # if not os.path.exists(self.storage_dir):
        #     print("creating directory")
        #     os.makedirs(self.storage_dir)

    def set(self, key, value):
        path = os.path.join(self.storage_dir, key)
        print("path is ", path)
        output_file = open(path, "w")
        json.dump(value, output_file)
        output_file.close()

    def get(self, key):
        path = os.path.join(self.storage_dir, key)
        output_file = open(path, "r")
        value = json.load(output_file)
        output_file.close()

        return value

    def delete(self, key):
        path = os.path.join(self.storage_dir, key)
        os.remove(path)


class StorageBackend:
    def __init__(self):
        print("initializing storage backend")
        self.backend = None
        self.storage_type = os.environ.get("SWOBUP_DATASTORAGE", "s3")
        if self.storage_type == "local":
            print("using local storage")
            self.backend = LocalStorage()
        else:
            print("using s3 storage")
            self.backend = S3Backend(app=app)

    def set(self, key, value):
        self.backend.set(key=key, value=json.dumps(value))


    def get(self, key):
        print("getting key")
        data = self.backend.get(key)

        data = json.loads(data)

        return data


    def delete(self, task_id):
        self.backend.delete(task_id)
