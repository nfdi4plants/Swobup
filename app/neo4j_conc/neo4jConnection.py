import asyncio
from neo4j import AsyncGraphDatabase, BoltDriver, GraphDatabase
import os
import threading

class Neo4jConnection:
    def __init__(self):
        self.username = os.getenv("DB_USER")
        self.password = os.getenv("DB_PASSWORD")
        self.batch_size = 10000
        self.uri = os.getenv("DB_URL")

        self.driver = GraphDatabase.driver(self.uri, auth=(self.username, self.password), connection_timeout=60)

        self.lock = threading.Lock()

    def write(self, batch_queries):
        """
        Writes a query to neo4j database
        :param batch_queries: list of tuples
        """
        with self.lock:
            # with GraphDatabase.driver(self.uri, auth=(self.username, self.password),
            #                                      max_connection_lifetime=3600) as driver:
            with self.driver.session() as session:
                with session.begin_transaction() as tx:
                    print("loop here---")
                    for query, params in batch_queries:
                        tx.run(query, **params)


    def read(self, query):
        """
        Reads some data from neo4j database
        :param query: neo4j query
        :return: neo4j record as list?
        """
        with self.lock:
            with self.driver.session() as session:
                # async with await session.begin_transaction() as tx:
                with session.begin_transaction() as tx:
                    # records = await session.read_transaction(get_people)
                    result = tx.run(query)
                    records = result.values()
                print(records)
            return records.pop()


    def close(self):
        self.driver.close()
