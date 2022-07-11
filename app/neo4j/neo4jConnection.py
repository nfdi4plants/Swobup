import neo4j

from neo4j import GraphDatabase
import time


class Neo4jConnection:

    def __init__(self, uri, user, pwd):
        self.__uri = uri
        self.__user = user
        self.__pwd = pwd
        self.__driver = None
        try:
            self.__driver = GraphDatabase.driver(self.__uri, auth=(self.__user, self.__pwd))
        except Exception as e:
            print("Failed to create the driver:", e)

    def check(self):
        try:
            self.__driver.verify_connectivity()
            status = True
        except:
            status = False

        return status

    def close(self):
        if self.__driver is not None:
            self.__driver.close()

    def query(self, query, parameters=None, db=None):
        assert self.__driver is not None, "Driver not initialized!"
        session = None
        response = None
        try:
            session = self.__driver.session(database=db) if db is not None else self.__driver.session()
            response = list(session.run(query, parameters))
        except Exception as e:
            print("Query failed:", e)
        finally:
            if session is not None:
                session.close()
        return response

    def insert_data(query, rows, batch_size):
        # Function to handle the updating the Neo4j database in batch mode.

        print("rows", rows)

        total = 0
        batch = 0
        start = time.time()
        result = None

        while batch * batch_size < len(rows):
            print("batch", batch)
            print("batch_size", batch_size)

            # print(rows[batch * batch_size:(batch + 1) * batch_size].to_dict('records'))

            res = conn.query(query,
                             parameters={'rows': rows[batch * batch_size:(batch + 1) * batch_size].to_dict('records')})

            # print(rows[batch*batch_size:(batch+1)*batch_size].to_dict('records'))

            total += res[0]['total']
            batch += 1
            result = {"total": total,
                      "batches": batch,
                      "time": time.time() - start}
            print(result)

        return result

    def add_terms(rows, batch_size=40000):
        # Adds author nodes to the Neo4j graph as a batch job.
        query = '''
                UNWIND $rows AS row
                MERGE (t:Term {accession: row.accession})
                SET t.name = COALESCE(t.name,row.name)
                SET t.definition = COALESCE(t.definition,row.definition)
                SET t.accession = COALESCE(t.accession,row.accession)
                RETURN count(*) as total
                '''

        print("out of add_terms")
        print("q", query)

        return rows.insert_data(query, rows, batch_size)

    def add_ontologies(rows, batch_size=40000):
        # Adds author nodes to the Neo4j graph as a batch job.
        query = '''
                UNWIND $rows AS row
                MERGE (:Ontology {name: row.ontology_name, lastUpdated: row.ontology_lastUpdated, 
                author: row.ontology_author, version: row.ontology_version})
                RETURN count(*) as total
                '''
        return rows.insert_data(query, rows, batch_size)

    def connect_ontology(rows, batch_size=100000):
        query = '''
                UNWIND $rows AS row
                MATCH (o:Ontology {name: row.ontology_name}), (t:Term {accession: row.accession})
                MERGE (t)-[:CONTAINED_IN]->(o)
                RETURN count(*) as total
                '''
        return insert_data(query, rows, batch_size)


conn = Neo4jConnection(uri="bolt://localhost:7687",
                       user="neo4j",
                       pwd="test")
