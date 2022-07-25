import os
from dotenv import load_dotenv
from celery import Celery
from celery.backends.s3 import S3Backend

load_dotenv()


imports = ['app.tasks.process_ontology',
           'app.tasks.add_external_ontologies',
           'app.tasks.add_to_database',
           'app.tasks.delete_ontologies',
           'app.tasks.clear_database_task',
           'app.tasks.template_tasks',
           'app.tasks.ontology_tasks']

app = Celery('tasks',
             # backend=os.environ.get("CELERY_BACKEND"),
             backend='s3',
             #broker=os.environ.get("CELERY_BROKER")
             broker = 'redis://localhost:6379/0'
             )

print("celery started...")

app.autodiscover_tasks(imports, force=True)

app.conf["s3_bucket"] = 'frct-public'
app.conf["s3_access_key_id"] = '2J1XRFN08O5Q8FPU66TY'
app.conf["s3_secret_access_key"] = 'ZsbHYfXQvwVpKuuF+r1oldOitQGonL7Lv4T0/my+'
# app.conf["s3_base_path"] = '/swobup/'
app.conf["s3_base_path"] = ''
app.conf["s3_endpoint_url"] = 'https://s3.bwsfs.de'
app.conf["s3_region"] = 'us-east-1'

print("sel", app.conf)