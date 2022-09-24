import os
from dotenv import load_dotenv
from celery import Celery

load_dotenv()

imports = ['app.tasks.process_ontology',
           'app.tasks.add_external_ontologies',
           'app.tasks.add_to_database',
           'app.tasks.delete_ontologies',
           'app.tasks.clear_database_task',
           'app.tasks.template_tasks',
           'app.tasks.ontology_tasks',
           'app.tasks.mail_task']

app = Celery('tasks',
             # backend=os.environ.get("CELERY_BACKEND"),
             # backend='s3',
             backend=os.environ.get("CELERY_BACKEND"),
             broker=os.environ.get("CELERY_BROKER")
             # broker = 'redis://localhost:6379/0'
             )

print("celery started...")

app.autodiscover_tasks(imports, force=True)

app.conf["s3_bucket"] = os.environ.get("s3_bucket")
app.conf["s3_access_key_id"] = os.environ.get("s3_access_key_id")
app.conf["s3_secret_access_key"] = os.environ.get("s3_secret_access_key")
# app.conf["s3_base_path"] = '/swobup/'
app.conf["s3_base_path"] = os.environ.get("s3_base_path")
app.conf["s3_endpoint_url"] = os.environ.get("s3_endpoint_url")
app.conf["s3_region"] = os.environ.get("s3_region")

print("configuration: ", app.conf)
