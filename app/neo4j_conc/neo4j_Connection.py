from neo4j import AsyncGraphDatabase
import pandas as pd
import os
import asyncio

from app.helpers.models.templates.template import Template


class Neo4j_Connection:

    def __init__(self):
        self.username = os.getenv("DB_USER")
        self.password = os.getenv("DB_PASSWORD")
        self.batch_size = 10000
        self.uri = os.getenv("DB_URL")

        self.driver = AsyncGraphDatabase.driver(self.uri, auth=(self.username, self.password),
                                                max_connection_lifetime=3600)

        print("password is", self.password)

    async def write_to_neo4j(self, batch_queries):
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

    async def add_temp(self, data):
        uri = "bolt://localhost:7687"
        user = "neo4j"
        password = "password"
        batch_size = 1000

        print("add temp")
        print(self.username)

        async with self.driver.session(database="neo4j") as session:
            print("data", data)

            query = ''' 
                    MERGE (t:Template {id:$id})
                    SET t.name = $name
                    SET t.description = $description
                    SET t.version = $version
                    SET t.authors = $authors
                    SET t.templateJson = $templateJson
                    SET t.organisation = $organisation
                    SET t.TimesUsed = COALESCE(t.timesUsed,0)
                    RETURN t
                    '''
            print("query is ", query)

            for i in range(0, len(data), self.batch_size):
                batch_data = data.iloc[i:i + self.batch_size]
                batch_queries = []
                # batch_data = []
                print("query", batch_queries)
                for index, row in batch_data.iterrows():
                    print("rr", row["Tags"])
                    params = {"id": row["Id"],
                              "name": row["Name"],
                              "description": row["Description"],
                              "version": row["Version"],
                              "authors": str(row["Authors"]),
                              "templateJson": str(row["TemplateJson"]),
                              "organisation": row["Organisation"],
                              # "lastUpdated":"test",
                              # "tags": row["Tags"],
                              # "erTags":"test",
                              "TimesUsed": "test"
                              }

                    print("parameters", params)
                    batch_queries.append((query, params))
                print("before loop")
                async with await session.begin_transaction() as tx:
                    print("loop here---")
                    for query, params in batch_queries:
                        print("##", query)
                        await tx.run(query, **params)

    def add_templates(self, data):

        batch_queries = []

        print("data", data)

        # query = '''
        # MERGE (t:Template {id:$id})
        # SET t.name = $name
        # SET t.description = $description
        # SET t.version = $version
        # SET t.authors = $authors
        # SET t.templateJson = $templateJson
        # SET t.organisation = $organisation
        # SET t.lastUpdated = $lastUpdated
        # SET t.tags = $tags
        # SET t.erTags = $erTags
        # SET t.lastUpdated = $lastUpdated
        # SET t.TimesUsed = COALESCE(t.timesUsed,0)
        # RETURN t
        # '''
        query = ''' 
                MERGE (t:Template {id:$id})
                SET t.name = $name
                SET t.description = $description
                SET t.version = $version
                SET t.authors = $authors
                SET t.templateJson = $templateJson
                SET t.organisation = $organisation
                SET t.TimesUsed = COALESCE(t.timesUsed,0)
                RETURN t
                '''
        print("query is ", query)

        for i in range(0, len(data), self.batch_size):
            batch_data = data.iloc[i:i + self.batch_size]
            batch_queries = []
            # batch_data = []
            print("query", batch_queries)
            for index, row in batch_data.iterrows():
                params = {"id": row["Id"],
                          "name": row["Name"],
                          "description": row["Description"],
                          "version": row["Version"],
                          "authors": str(row["Authors"]),
                          "templateJson": str(row["TemplateJson"]),
                          "organisation": row["Organisation"],
                          # "lastUpdated":"test",
                          # "tags": row["Tags"],
                          # "erTags":"test",
                          "TimesUsed": "test"
                          }
                batch_queries.append((query, params))

            print(batch_queries)

        # self.write_to_neo4j(batch_queries)
        return batch_queries
