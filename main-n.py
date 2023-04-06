# from .neo4j_Connection import Neo4j_Connection
import asyncio

from app.neo4j_conc.neo4j_Connection import Neo4j_Connection
from app.neo4j_conc.neo4jConnection import Neo4jConnection
import pandas as pd
import json
import sys

from dotenv import load_dotenv
from app.neo4j_conc.template_operations import *

load_dotenv()

from app.helpers.models.templates.template import Template


# async def add_template(dataframe):
#     await neo4j_conn.add_templates(dataframe)


async def main():
    # neo4j_conn = Neo4j_Connection()
    neo4j_conn = Neo4jConnection()
    json_file = open("example.json", "r")
    data = json.loads(json_file.read())
    data_list = []
    data_list.append(data)

    print(data_list)
    dataframe = pd.DataFrame(data_list, index=None)

    print(dataframe)
    print("now adding to DB")

    # await neo4j_conn.add_temp(dataframe)
    # await neo4j_conn.add_templates(dataframe)
    # query = neo4j_conn.add_templates(dataframe)
    query = add_template(dataframe)
    # await neo4j_conn.write_to_neo4j(query)
    await neo4j_conn.write(query)

    # query = delete_template("f12e98ee-a4e7-4ada-ba56-1e13cce1a44b")
    # await neo4j_conn.write_to_neo4j(query)

    # query = delete_all_templates()
    # await neo4j_conn.write_to_neo4j(query)

    print("reading...")

    query = get_number_templates()
    results = await neo4j_conn.read(query)
    print("results are: ",results)


if __name__ == '__main__':
    asyncio.run(main())
    print("after neo4j")


