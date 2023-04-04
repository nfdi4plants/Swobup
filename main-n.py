# from .neo4j_Connection import Neo4j_Connection
import asyncio

from app.neo4j_conc.neo4j_Connection import Neo4j_Connection
import pandas as pd
import json
import sys

from dotenv import load_dotenv

load_dotenv()

from app.helpers.models.templates.template import Template


async def add_template(dataframe):
    await neo4j_conn.add_templates(dataframe)


async def main():
    neo4j_conn = Neo4j_Connection()
    json_file = open("example.json", "r")
    data = json.loads(json_file.read())
    data_list = []
    data_list.append(data)

    print(data_list)
    dataframe = pd.DataFrame(data_list, index=None)

    print(dataframe)

    await neo4j_conn.add_temp(dataframe)


if __name__ == '__main__':
    # neo4j_conn = Neo4j_Connection()
    # # neo4j.add_templates(data: pd.Dataframe)#
    #
    # json_file = open("example.json","r")
    # data = json.loads(json_file.read())
    # json_file.close()
    #
    # data_list = []
    # data_list.append(data)
    #
    #
    # print(data_list)
    #
    #
    #
    # # template = Template.parse_obj(data)
    #
    # # print(template)
    #
    # # sys.exit()
    #
    # dataframe = pd.DataFrame(data_list,index=None)
    #
    # print(dataframe)
    # print("after dataframe")


    # asyncio.run(neo4j_conn.add_temp(dataframe))



    # neo4j.add_templates(dataframe)

    # add_template(dataframe)

    # asyncio.run(neo4j.add_templates(dataframe))

    asyncio.run(main())

    print("after neo4j")


