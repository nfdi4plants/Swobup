# import StringIO
import boto3
import json

# from celery import app
from tasks import app

from botocore.client import Config

from app.helpers.general_downloader import GeneralDownloader

class S3Storage:
    def __init__(self):
        self.s3_access_key_id = app.conf.s3_access_key_id
        self.s3_secret_access_key = app.conf.s3_secret_access_key,
        self.s3_base_path = app.conf.s3_base_path,
        self.s3_bucket = app.conf.s3_bucket
        self.s3_endpoint_url = app.conf.s3_endpoint_url

        self.session = boto3.session.Session()

        self.s3_client = self.session.client(
            service_name='s3',
            aws_access_key_id=self.s3_access_key_id,
            aws_secret_access_key=self.s3_secret_access_key,
            endpoint_url=self.s3_endpoint_url
        )

        self.s3_resource = self.session.resource(
            service_name='s3',
            aws_access_key_id=self.s3_access_key_id,
            aws_secret_access_key=self.s3_secret_access_key,
            endpoint_url=self.s3_endpoint_url
        )

    def load_result(self, task_id):
        # s3 = boto3.client('s3')
        # with open('FILE_NAME', 'wb') as f:
        #     s3.download_fileobj('BUCKET_NAME', 'OBJECT_NAME', f)

        s3_resource = self.session.resource(
            service_name='s3',
            aws_access_key_id=self.s3_access_key_id,
            aws_secret_access_key=self.s3_secret_access_key,
            endpoint_url=self.s3_endpoint_url
        )

        print(self.s3_base_path)

        s3_key = app.conf.s3_endpoint_url + app.conf.s3_base_path + "task-meta-" + task_id

        print("s3key", s3_key)

        file = s3_resource.download_file(s3_key, "result.json")

        print("file", file)#

    def download_one_file2(self, task_id):
        # """
        # Download a single file from S3
        # Args:
        #     bucket (str): S3 bucket where images are hosted
        #     output (str): Dir to store the images
        #     client (boto3.client): S3 client
        #     s3_file (str): S3 object name
        # """

        s3_key = app.conf.s3_endpoint_url + app.conf.s3_base_path + "task-meta-" + task_id

        file = self.s3_client.download_file(
            Bucket = app.conf, Key=app.conf.s3_base_path, Filename="result.json"
        )

        print("file", file)

    def download_test(self, task_id):

        s3_key = app.conf.s3_endpoint_url + "/" + app.conf.s3_base_path + "celery-task-meta-" + task_id
        downloader = GeneralDownloader(s3_key)
        file = downloader.download_file()

        print("file", file)


    def download_one_file(self, task_id):
        # """
        # Download a single file from S3
        # Args:
        #     bucket (str): S3 bucket where images are hosted
        #     output (str): Dir to store the images
        #     client (boto3.client): S3 client
        #     s3_file (str): S3 object name
        # """

        s3_key = app.conf.s3_endpoint_url +"/" +app.conf.s3_base_path + "celery-task-meta-" + task_id

        s3_key = s3_key.replace("https://", "https://" +app.conf.s3_bucket +".")

        s3_key = app.conf.s3_bucket

        s3_key = app.conf.s3_base_path + "celery-task-meta-" + task_id

        #content_object = self.s3_resource.Object(s3_key, 'result.json')
        #file_content = content_object.get()['Body'].read().decode('utf-8')
        #json_content = json.loads(file_content)

        #json_content = self.s3_resource.client.download_file(app.conf.s3_bucket, s3_key, 'result.json')


        # session = boto3.session.resource(
        #     service_name='s3',
        #     aws_access_key_id=app.conf.s3_access_key_id,
        #     aws_secret_access_key=app.conf.s3_secret_access_key,
        #     endpoint_url=app.conf.s3_endpoint_url
        # )

        s3 = boto3.client(
            service_name='s3',
            aws_access_key_id=app.conf.s3_access_key_id,
            aws_secret_access_key=app.conf.s3_secret_access_key,
            endpoint_url=app.conf.s3_endpoint_url,
            config = Config(s3={'addressing_style': 'virtual'})
        )


        print("key", s3_key)


        # s3 = self.resource('s3')
        #json_content = s3.Bucket(app.conf.s3_bucket).download_file(s3_key, 'bla')
        #json_content = s3.download_fileobj(app.conf.s3_bucket, s3_key, str(s3_key))

        #json_content = s3.Bucket(app.conf.s3_bucket).download_file(s3_key, 'bla')
        json_content = s3.download_file(app.conf.s3_bucket, s3_key, str(s3_key))



        print("file", json_content)
