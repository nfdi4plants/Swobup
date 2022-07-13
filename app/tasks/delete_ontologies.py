from tasks import app

from app.helpers.obo_parser import OBO_Parser

from app.neo4j.neo4jConnection import Neo4jConnection

@app.task
def delete_ontology_task(payload):

    conn = Neo4jConnection(uri="bolt://127.0.0.1:7687",
                           user="neo4j",
                           pwd="test")

    print("payload", payload)

    if payload.get("url"):
        print("url is available")

    if payload.get("ontology"):
        print("ontologies were given")
        for ontology_name in payload.get("ontology"):
            conn.delete_ontology(ontology_name)