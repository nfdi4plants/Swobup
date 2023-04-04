import datetime

from neo4j import AsyncGraphDatabase
import pandas as pd
import os
import asyncio

from app.helpers.models.templates.template import Template


def add_template(data, batch_size=10000):

    batch_queries = []

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

    update_time = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

    for i in range(0, len(data), batch_size):
        batch_data = data.iloc[i:i + batch_size]
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
                      "lastUpdated":update_time,
                      "tags": str(row["Tags"]),
                      "erTags":str(row["Tags"])
                      }
            batch_queries.append((query, params))

        print(batch_queries)

    # self.write_to_neo4j(batch_queries)
    return batch_queries


def delete_template(template_id):
    batch_queries = []

    query = '''
            MATCH (t:Template {id: $template_id}) DELETE t
            '''
    params = {
        "template_id": template_id
    }

    batch_queries.append((query, params))

    return batch_queries

def delete_all_templates():
    batch_queries = []
    query = '''
            MATCH (t:Template) DELETE t
            '''
    params = {}

    batch_queries.append((query, params))

    return batch_queries


def get_number_templates():
    # batch_queries = []
    query = '''
            MATCH (t:Template) 
            RETURN count(labels(t));
            '''
    return query


