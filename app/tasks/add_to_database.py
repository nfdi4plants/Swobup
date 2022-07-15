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


from app.helpers.oboparsing.models.term import Term
from app.helpers.oboparsing.models.ontology import Ontology
from app.helpers.oboparsing.models.relationships import Relationships
from app.helpers.oboparsing.models.obo_file import OboFile

from app.neo4j.neo4jConnection import Neo4jConnection


@app.task
def write_to_db(data):
    print("in write db")
    # print("data", data)
    #
    # terms = data.get("terms")
    #
    # print("terms", terms)

    # print("ontologies:", data.get("ontologies"))

    terms_df = pd.DataFrame(data.get("terms"), index=None)

    ontology_df = pd.DataFrame(data.get("ontologies"), index=None)

    relations_df = pd.DataFrame(data.get("relationships"), index=None)

    # print("terms", terms_df)
    # print("ontologies", ontology_df)

    # neo4j_connector = Neo4jConnection()

    conn = Neo4jConnection(uri="bolt://127.0.0.1:7687",
                           user="neo4j",
                           pwd="test")

    status = conn.check()

    # print("status", status)

    # print("adding ontologies")
    conn.add_ontologies(ontology_df)
    # print("adding terms")
    conn.add_terms(terms_df)
    # print("connecting ontologies")
    conn.connect_ontology(terms_df)
    # print("connecting relationships")
    # conn.connect_ontology(relations_df)
    for relation_type in relations_df.rel_type.unique():
        # print("type:", relation_type)
        # print("df:", relations_df.loc[relations_df["rel_type"] == relation_type])
        current_rel_df = relations_df.loc[relations_df["rel_type"] == relation_type]
        # print("adding relations of ", )
        conn.connect_term_relationships(current_rel_df, relation_type, batch_size=40000)


@app.task
def add_template(data):
    pass