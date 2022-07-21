import os
from dotenv import load_dotenv
from celery import Celery

s3_access_key_id = 'acces_key_id'
s3_secret_access_key = 'acces_secret_access_key'
s3_bucket = 'bucket_name'
s3_base_path = '/prefix'
s3_endpoint_url = 'https://.s3.custom.url'
s3_region = 'us-east-1'

load_dotenv()

imports = ['app.tasks.process_ontology',
           'app.tasks.add_external_ontologies',
           'app.tasks.add_to_database',
           'app.tasks.delete_ontologies',
           'app.tasks.clear_database_task',
           'app.tasks.template_tasks',
           'app.tasks.ontology_tasks']

app = Celery('tasks',
             backend=os.environ.get("CELERY_BACKEND"),
             broker=os.environ.get("CELERY_BROKER"),
             
             )

print("celery started...")

app.autodiscover_tasks(imports, force=True)
