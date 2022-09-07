import obonet
import networkx
import datetime
import sys
import pandas as pd
from io import StringIO

import time

from tasks import app
from app.github.webhook_payload import PushWebhookPayload
from app.github.downloader import GitHubDownloader
from app.helpers.obo_parser import OBO_Parser

from celery.result import AsyncResult

from app.neo4j.neo4jConnection import Neo4jConnection
from app.helpers.notifications.models.notification_model import Notifications, Message

from app.helpers.s3_storage import S3Storage

from celery.backends.s3 import S3Backend
import json


@app.task
def add_ontologies(data):
    print("in write db")
    # print("id is now", data)

    # getting results from s3 storage
    # s3_storage = S3Storage()

    # data = s3_storage.download_one_file(data)
    # data = AsyncResult(data, app=app)

    backend = S3Backend(app=app)

    # print(backend.bucket_name)
    # print(backend.aws_access_key_id)
    # print(backend.aws_secret_access_key)
    # print(backend.get_status)
    # print(backend.bucket_name)

    # s3_key = str(app.conf.s3_base_path + "celery-task-meta-" + data)

    # print("s3key", s3_key)

    messages = data.get("notifications")

    notifications = Notifications(**messages)

    task_id = data.get("task_id")
    # notifications = data.get("notifications")

    print("task_id", task_id)

    # res = backend.get(s3_key)
    # bla = backend.get_key_for_task(task_id).decode()
    bla = task_id
    print("bla", bla)

    data = backend.get(bla)

    print("data is", data)

    if data is None:
        print("could not connect to storage backend (adding)")
        notifications.messages.append(Message(type="fail", message="Could not connect to storage backend"))
        notifications = notifications.dict()
        return notifications

    print("t", type(data))
    data = json.loads(data)
    print("d", type(data))

    # print("res", res)

    # print("data", data)
    #
    # terms = data.get("terms")
    #
    # print("terms", terms)

    # print("ontologies:", data.get("ontologies"))

    terms_df = pd.DataFrame(data.get("terms"), index=None)
    ontology_df = pd.DataFrame(data.get("ontologies"), index=None)
    relations_df = pd.DataFrame(data.get("relationships"), index=None)

    # ontology_df.to_csv('ontos.csv', index=False)
    #
    # relations_df.to_csv('rel.csv', index=False)
    #
    # terms_df.to_csv('terms.csv', index=False)

    # print("terms", terms_df)
    # print("ontologies", ontology_df)

    # neo4j_connector = Neo4jConnection()

    print("##", data.get("ontologies"))

    conn = Neo4jConnection()

    status = conn.check()

    if status is False:
        print("database not connected")
        notifications.messages.append(Message(type="fail", message="Could not connect to database"))
        notifications = notifications.dict()
        return notifications

    ontology_name = data.get("ontologies")[0].get("name")

    # print("status", status)

    # print("adding ontologies")
    conn.add_ontologies(ontology_df)


    # print("adding terms")
    conn.add_terms(terms_df)
    # print("connecting ontologies")
    conn.connect_ontology(terms_df)
    # print("connecting relationships")
    # conn.connect_ontology(relations_df)
    # for relation_type in relations_df.rel_type.unique():
    #     # print("type:", relation_type)
    #     # print("df:", relations_df.loc[relations_df["rel_type"] == relation_type])
    #     current_rel_df = relations_df.loc[relations_df["rel_type"] == relation_type]
    #     # print("adding relations of ", )
    #     conn.connect_term_relationships(current_rel_df, relation_type, batch_size=40000)

    # print("adding relations: ")
    # print("rel_def", relations_df)
    conn.connect_term_relationships_apoc(relations_df)

    #
    # return True

    backend.delete(task_id)

    notifications.messages.append(
        Message(type="success", message="Ontology " + "<b>" + ontology_name + "</b> written to database"))

    notifications = notifications.dict()

    print("notis", notifications)

    return notifications


@app.task
def update_ontologies(task_results):
    print("in update db")

    messages = task_results.get("notifications")

    notifications = Notifications(**messages)

    backend = S3Backend(app=app)

    #print(backend.endpoint_url, backend.url, backend.app, backend.base_path, backend.bucket_name)

    task_id = task_results.get("task_id")
    data = backend.get(task_id)
    if data is None:
        print("could not connect to storage backend")
        notifications.messages.append(Message(type="fail", message="Could not connect to storage backend"))
        notifications = notifications.dict()
        return notifications

    data = json.loads(data)
    print("data is", data)

    terms = data.get("terms")



    term_accessions = []
    for term in terms:
        term_accessions.append(term.get("accession"))

    print(term_accessions)

    conn = Neo4jConnection()

    status = conn.check()

    if status is False:
        print("database not connected")
        notifications.messages.append(Message(type="fail", message="Could not connect to database"))
        notifications = notifications.dict()
        return notifications

    ontology_name = data.get("ontologies")[0].get("name")

    # get list of to deleted terms
    db_term_list = conn.list_terms_of_ontology(ontology_name)

    terms_to_remove = list(set(db_term_list).difference(term_accessions))

    # generate a list of dictionaries
    terms_remove = []
    for term_remove in terms_to_remove:
        terms_remove.append({"accession": term_remove})

    # create a dataframe from list of dictionaries
    terms_remove_df = pd.DataFrame(terms_remove, index=None)

    conn.delete_terms(terms_remove_df)

    print("after deletion")

    terms_df = pd.DataFrame(data.get("terms"), index=None)

    ontology_df = pd.DataFrame(data.get("ontologies"), index=None)

    relations_df = pd.DataFrame(data.get("relationships"), index=None)

    # ontology_df.to_csv('ontos.csv', index=False)
    #
    # relations_df.to_csv('rel.csv', index=False)
    #
    # terms_df.to_csv('terms.csv', index=False)


    # print("adding ontologies")
    conn.update_ontologies(ontology_df)



    # print("adding terms")
    conn.update_terms(terms_df)
    # print("connecting ontologies")
    conn.connect_ontology(terms_df)
    # print("connecting relationships")
    # conn.connect_ontology(relations_df)
    conn.connect_term_relationships_apoc(relations_df)

    # for relation_type in relations_df.rel_type.unique():
    #     # print("type:", relation_type)
    #     # print("df:", relations_df.loc[relations_df["rel_type"] == relation_type])
    #     current_rel_df = relations_df.loc[relations_df["rel_type"] == relation_type]
    #     # print("adding relations of ", )
    #     conn.connect_term_relationships(current_rel_df, relation_type, batch_size=40000)

    backend.delete(task_id)


    notifications.messages.append(Message(type="success", message="Ontology " +"<b>" +ontology_name +"</b> written to database"))
    notifications.messages.append(Message(type="success", message="File contained " +str(len(ontology_df)) + " other ontologies, that were written to database"))
    notifications.messages.append(Message(type="success", message="File contained " +str(len(terms_df)) + " terms"))
    notifications.messages.append(Message(type="success", message="File contained " +str(len( relations_df)) +" relations"))


    notifications = notifications.dict()

    return notifications


@app.task
def clear_database_task():
    conn = Neo4jConnection()

    # result = conn.delete_database()
    result = conn.delete_database()

    return result
