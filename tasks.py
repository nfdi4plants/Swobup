import os
from dotenv import load_dotenv
from celery import Celery

load_dotenv()

imports = ['app.tasks.process_ontology',
           'app.tasks.add_external_ontologies',
           'app.tasks.add_to_database']

app = Celery('tasks',
             backend=os.environ.get("CELERY_BACKEND"),
             broker=os.environ.get("CELERY_BROKER"),
             )

print("celery started...")

app.autodiscover_tasks(imports, force=True)
