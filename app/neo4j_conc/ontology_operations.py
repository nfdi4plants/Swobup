def list_terms():
    query = '''
            MATCH (n:Term) 
            RETURN n.name
            '''
    return query


def get_main_ontologies():
    query = '''
            match(o:Ontology{generated:False})
            return o.name, o.version, o.lastUpdated
            '''
    return query


def get_number_relationships():
    query = '''
            MATCH (n)-[r]->() 
            RETURN COUNT(r)
            '''
    return query


def get_number_ontologies():
    query = '''
            MATCH (o:Ontology) 
            RETURN count(labels(o));
            '''
    return query


def list_terms_of_ontology():
    query = '''
            MATCH (Ontology {name: $ontology_name})--(term)
            RETURN term.accession
            '''
    return query


def connect_term_relationships_apoc():
    query = '''
            UNWIND $rows AS row
            MATCH (t:Term {accession: row.node_from})
            MATCH (s:Term {accession: row.node_to})
            CALL apoc.merge.relationship(t, row.rel_type, {}, {},  s, {}) yield rel
            RETURN count(*) as total
            '''
    return query


def add_ontologies(data, batch_size: int = 40000) -> list:
    batch_queries = []

    query = '''
            UNWIND $rows AS row
            MERGE (o:Ontology {name: row.name})
            SET o.lastUpdated = COALESCE(o.lastUpdated,row.lastUpdated)
            SET o.author = COALESCE(o.author,row.author)
            SET o.version = COALESCE(o.version,row.version)
            SET o.generated = COALESCE(o.generated,row.generated)
            SET o.importedFrom = COALESCE(o.importedFrom,row.importedFrom)
            RETURN count(*) as total
            '''

    for i in range(0, len(data), batch_size):
        batch_data = data.iloc[i:i + batch_size]
        batch_queries = []
        # batch_data = []
        print("query", batch_queries)
        for index, row in batch_data.iterrows():
            params = {"lastUpdated": row["Id"],
                      "version": row["Name"],
                      "description": row["Description"],
                      "version": row["Version"],
                      "generated": str(row["Authors"]),
                      "importedFrom": str(row["TemplateJson"]),
                      "organisation": row["Organisation"],
                      }
            batch_queries.append((query, params))


    return query


def list_terms_of_ontology():
    query = '''
            MATCH (Ontology {name: $ontology_name})--(term)
            RETURN term.accession
            '''
    return query
