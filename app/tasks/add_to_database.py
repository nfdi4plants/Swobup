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
    terms = data.get("terms")
    #
    print("terms", terms)

    terms_df = pd.DataFrame(data.get("terms"), index=None)

    ontology_df = pd.DataFrame(data.get("ontologies"), index=None)

    print("terms", terms_df)
    print("ontologies", ontology_df)

    # neo4j_connector = Neo4jConnection()

    conn = Neo4jConnection(uri="bolt://localhost:7687",
                           user="neo4j",
                           pwd="test")

    for index, row in ontology_df.iterrows():
        print(row["name"])
        print(row["lastUpdated"])
        print(row["author"])
        print(row["version"])
        print(row["generated"])
        print("---------------")


    for index, row in terms_df.iterrows():
        print(row["accession"])
        print(row["name"])
    conn.add_terms(terms_df)