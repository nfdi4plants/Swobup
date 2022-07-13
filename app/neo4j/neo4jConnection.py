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

    def insert_data(self, query, rows, batch_size):
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

            res = self.query(query,
                             parameters={'rows': rows[batch * batch_size:(batch + 1) * batch_size].to_dict('records')})

            # print(rows[batch*batch_size:(batch+1)*batch_size].to_dict('records'))

            print("toal", total)

            total += res[0]['total']
            batch += 1
            result = {"total": total,
                      "batches": batch,
                      "time": time.time() - start}
            print(result)

        return result

    def add_terms(self, rows, batch_size=40000):
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

        return self.insert_data(query, rows, batch_size)

    def add_ontologies(self, rows, batch_size=40000):
        # Adds author nodes to the Neo4j graph as a batch job.
        query = '''
                UNWIND $rows AS row
                MERGE (o:Ontology {name: row.name})
                SET o.lastUpdated = COALESCE(o.lastUpdated,row.lastUpdated)
                SET o.author = COALESCE(o.author,row.author)
                SET o.version = COALESCE(o.version,row.version)
                SET o.generated = COALESCE(o.generated,row.generated)
                RETURN count(*) as total
                '''
        return self.insert_data(query, rows, batch_size)

    def connect_ontology(self, rows, batch_size=100000):
        query = '''
                UNWIND $rows AS row
                MATCH (o:Ontology {name: row.ontology_origin}), (t:Term {accession: row.accession})
                MERGE (t)-[:CONTAINED_IN]->(o)
                RETURN count(*) as total
                '''
        return self.insert_data(query, rows, batch_size)

    def connect_term_relationships(self, rows, rel_type, batch_size=100000):
        # rel_type = "is_a"
        # rel_type = rel_type
        if ":" in rel_type:
            rel_type = rel_type.replace(":", "_")
        if "-" in rel_type:
            rel_type = "connection"

        statement_string = "UNWIND $rows AS row MATCH (t:Term {accession: row.node_from}), (s:Term {accession: row.node_to}) MERGE (s)-[:" + str(
            rel_type) + "]->(t) RETURN count(*) as total"

        query = '''
                UNWIND $rows AS row
                MATCH (t:Term {accession: row.node_from}), (s:Term {accession: row.node_to})
                MERGE (s)-[:`+rel_type`]->(t)
                RETURN count(*) as total
                '''
        return self.insert_data(statement_string, rows, batch_size)


    def delete_ontology(self, ontology_name):

        query = "MATCH (n:Ontology) where n.name='"+str(ontology_name)+"' CALL { WITH n DETACH DELETE n} " \
                                                                       "IN TRANSACTIONS OF 10000 ROWS;"

        print("query", query)

        self.query(query)
        # return self.insert_data()


    def delete_database(self):

        query = '''
                MATCH (n)
                DETACH DELETE n
                '''

        self.query(query)


# conn = Neo4jConnection(uri="bolt://localhost:7687",
#                        user="neo4j",
#                        pwd="test")
