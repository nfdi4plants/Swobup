from neo4j import GraphDatabase
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

    async def write_to_neo4j(self, data: pd.DataFrame, batch_queries):
        uri = "bolt://localhost:7687"
        user = "neo4j"
        password = "password"
        batch_size = 1000

        async with GraphDatabase.driver(uri, auth=(self.username, self.password), max_connection_lifetime=3600) as driver:
            async with driver.session() as session:
                #for i in range(0, len(data), self.batch_size):
                    batch_data = data.iloc[i:i+batch_size]
                    #batch_queries = []
                    #for index, row in batch_data.iterrows():
                        #query = "CREATE (p:Person {name: $name})"
                        #params = {"name": row["name"]}
                        #batch_queries.append((query, params))
                    async with session.begin_transaction() as tx:
                        for query, params in batch_queries:
                            await tx.run(query, **params)


    def add_templates(self, data):

        print("data", data)

        query = '''
                        MERGE (t:Template {id:$id})
                        SET t.name = $name
                        SET t.description = $description
                        SET t.version = $version
                        SET t.authors = $authors
                        SET t.templateJson = $templateJson
                        SET t.organisation = $organisation
                        SET t.lastUpdated = $lastUpdated
                        SET t.tags = $tags
                        SET t.erTags = $erTags
                        SET t.lastUpdated = $lastUpdated
                        SET t.TimesUsed = COALESCE(t.timesUsed,0)
                        RETURN t
                        '''
        print("query is ", query)

        for i in range(0, len(data), self.batch_size):
            batch_data = data.iloc[i:i+self.batch_size]
            batch_queries = []
            # batch_data = []
            print("query", batch_queries)
            for index, row in batch_data.iterrows():
                params = {"id": row["Id"],
                          "name": row["Name"],
                          "description":row["Description"],
                          "version":row["Version"],
                          "authors":row["Authors"],
                          "templateJson":row["TemplateJson"],
                          "organisation":row["Organisation"],
                          # "lastUpdated":row["LastUpdated"],
                          "tags":row["Tags"],
                          # "erTags":row["ErTags"],
                          # "TimesUsed":row["TimesUsed"]
                          }
                batch_queries.append((query, params))

        self.write_to_neo4j(data, params)