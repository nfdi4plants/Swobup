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


def update_ontologies():
    query = '''
            UNWIND $rows AS row
            MERGE (o:Ontology {name: row.name})
            SET o.lastUpdated = row.lastUpdated
            SET o.author = row.author
            SET o.version = row.version
            SET o.generated = COALESCE(o.generated,row.generated)
            SET o.importedFrom = COALESCE(o.importedFrom,row.importedFrom)
            RETURN count(*) as total
            '''
    return query


def list_terms_of_ontology():
    query = '''
            MATCH (Ontology {name: $ontology_name})--(term)
            RETURN term.accession
            '''
    return query
