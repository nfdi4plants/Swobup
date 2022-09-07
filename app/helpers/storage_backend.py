import json
import os

from os import path

from celery.backends.s3 import S3Backend

from tasks import app


class LocalStorage:
    def __int__(self):
        self.path = "data"

    def set(self, **params):
        pass


class StorageBackend:
    def __int__(self):
        self.mode:bool = False
        self.backend = None

        if os.environ.get("storage") == "local":
            self.backend = LocalStorage()
            self.mode = False
        else:
            self.backend = S3Backend(app=app)
            self.mode = True

    def store(self, task_id, data):
        if self.mode:
            self.backend.set(key=task_id, value=json.dumps(data))
        else:
            self.backend.set()

    def get(self, task_id):
        data = self.backend.get(task_id)
        return data

    def delete(self, task_id):
        self.backend.delete(task_id)
