import asyncio
from neo4j import AsyncGraphDatabase, BoltDriver


class Neo4jWriter:
    def __init__(self, uri, user, password):
        self.driver = AsyncGraphDatabase.driver(uri, auth=(user, password), connection_timeout=60)

    async def write(self, query):
        async with self.driver.session() as session:
            async with await session.begin_transaction() as tx:
                await tx.run(query)

    def close(self):
        self.driver.close()
