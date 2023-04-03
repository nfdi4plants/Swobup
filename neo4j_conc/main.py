from .neo4j_Connection import Neo4j_Connection
import pandas as pd

if __name__ == '__main__':
    neo4j = Neo4j_Connection()
    neo4j.add_templates(data: pd.Dataframe)


