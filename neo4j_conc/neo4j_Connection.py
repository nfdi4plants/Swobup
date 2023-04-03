from neo4j import GraphDatabase
import pandas as pd


class Neo4j_Connection:

    def __init__(self):
        self.username = "user"
        self.password = "password"
        self.bach_size = 10000
        self.uri = "db://bla"

    async def write_to_neo4j(self, data: pd.DataFrame, query, params):
        uri = "bolt://localhost:7687"
        user = "neo4j"
        password = "password"
        batch_size = 1000

        async with GraphDatabase.driver(uri, auth=(self.username, self.password), max_connection_lifetime=3600) as driver:
            async with driver.session() as session:
                for i in range(0, len(data), self.batch_size):
                    batch_data = data.iloc[i:i+batch_size]
                    batch_queries = []
                    #for index, row in batch_data.iterrows():
                        #query = "CREATE (p:Person {name: $name})"
                        #params = {"name": row["name"]}
                        batch_queries.append((query, params))
                    async with session.begin_transaction() as tx:
                        for query, params in batch_queries:
                            await tx.run(query, **params)


    async def add_templates(self, data: pd.DataFrame):
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
        for i in range(0,len(data, self.bach_size)):
            batch_data = data.iloc[i:i+self.bach_size]
            batch_data = []
            for index, row in batch_data.iterrows():
                params = {"id": row["id"],
                          "name": row["name"],
                          "description":row["description"],
                          "version":row["version"],
                          "authors":row["authors"],
                          "templateJson":row["templateJson"],
                          "organisation":row["organisation"],
                          "lastUpdated":row["lastUpdated"],
                          "tags":row["tags"],
                          "erTags":row["erTags"],
                          "TimesUsed":row["TimesUsed"]
                          }

        self.write_to_neo4j(data, params)