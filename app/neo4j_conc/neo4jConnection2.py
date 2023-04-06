import asyncio
from neo4j import AsyncGraphDatabase, BoltDriver
import os


class Neo4jConnection:
    def __init__(self):
        self.username = os.getenv("DB_USER")
        self.password = os.getenv("DB_PASSWORD")
        self.batch_size = 10000
        self.uri = os.getenv("DB_URL")

        self.driver = AsyncGraphDatabase.driver(self.uri, auth=(self.username, self.password), connection_timeout=60)

    async def write(self, batch_queries):
        """
        Writes a query to neo4j database
        :param batch_queries: list of tuples
        """
        async with AsyncGraphDatabase.driver(self.uri, auth=(self.username, self.password),
                                             max_connection_lifetime=3600) as driver:
            async with driver.session(database="neo4j") as session:
                async with await session.begin_transaction() as tx:
                    print("loop here---")
                    for query, params in batch_queries:
                        await tx.run(query, **params)


    async def read(self, query):
            async with self.driver.session() as session:
                # async with await session.begin_transaction() as tx:
                async with await session.begin_transaction() as tx:
                    # records = await session.read_transaction(get_people)
                    result = await tx.run(query)
                    records = await result.values()
                print(records)
            return records.pop()


    def close(self):
        self.driver.close()
