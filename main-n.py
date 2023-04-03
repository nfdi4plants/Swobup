# from .neo4j_Connection import Neo4j_Connection
from app.neo4j_conc.neo4j_Connection import Neo4j_Connection
import pandas as pd
import json
import sys

from dotenv import load_dotenv

load_dotenv()

from app.helpers.models.templates.template import Template

if __name__ == '__main__':
    neo4j = Neo4j_Connection()
    # neo4j.add_templates(data: pd.Dataframe)#

    json_file = open("example.json","r")
    data = json.loads(json_file.read())
    json_file.close()

    data_list = []
    data_list.append(data)


    print(data_list)



    # template = Template.parse_obj(data)

    # print(template)

    # sys.exit()

    dataframe = pd.DataFrame(data_list,index=None)

    print(dataframe)
    print("after dataframe")



    neo4j.add_templates(dataframe)

    print("after neo4j")


