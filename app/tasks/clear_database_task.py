from tasks import app

from app.helpers.obo_parser import OBO_Parser

from app.neo4j.neo4jConnection import Neo4jConnection


@app.task
def clear_database_task():
    conn = Neo4jConnection(uri="bolt://127.0.0.1:7687",
                           user="neo4j",
                           pwd="test")

    # result = conn.delete_database()
    result = conn.delete_database_batch()

    return result