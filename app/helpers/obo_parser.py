import obonet
import sys
import pandas
import re
import datetime

from app.helpers.oboparsing.models.term import Term
from app.helpers.oboparsing.models.ontology import Ontology
from app.helpers.oboparsing.models.relationships import Relationships
from app.helpers.oboparsing.models.obo_file import OboFile

from resource import *

class OBO_Parser:
    def __init__(self, ontology_file):
        self.ontology_file = ontology_file
        self.nodes = []
        self.relations = []

        self.metadata = []

        self.ontolgies = []

        self.relationships = []

        self.obo_file = OboFile()

    def get_author_list(line):
        # Cleans author dataframe column, creating a list of authors in the row.
        return [e[1] + ' ' + e[0] for e in line]

    def get_category_list(line):
        # Cleans category dataframe column, creating a list of categories in the row.
        return list(line.split(" "))

    def get_ontology_list(self):
        return self.ontolgies

    def get_relations(self):
        return self.relationships

    def ontology_available(self, node_prefix):
        for ontology in self.obo_file.ontologies:
            if node_prefix == ontology.name:
                return True
        return False

    def term_available(self, term_accession):
        for term in self.obo_file.terms:
            if term_accession == term.accession:
                return True
        return False

    def parse(self):
        # try to read ontology file
        try:
            graph = obonet.read_obo(self.ontology_file, ignore_obsolete=False)

        except Exception as e:
            sys.exit()

        try:
            ontology_name = graph.graph.get("name", None)
            ontology_author = graph.graph.get("saved-by", None)
            ontology_version = graph.graph.get("data-version", None)
            ontology_lastUpdated = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

            treat_equivalent = graph.graph.get("treat-xrefs-as-equivalent", None)
            treat_relationship = graph.graph.get("treat-xrefs-as-relationship", None)
            treat_isa = graph.graph.get("treat-xrefs-as-is_a", None)



            ontology = Ontology(name=ontology_name, lastUpdated=ontology_lastUpdated, author=ontology_author,
                                version=ontology_version, generated=False)
            self.obo_file.ontologies.append(ontology)
        except:
            print("name not found")

        try:
            nodes = graph.nodes
        except Exception as e:
            nodes = []

        # go through all nodes
        for node in nodes:

            # current_dict = dict()
            name = graph.nodes[node].get("name", None)
            definition = graph.nodes[node].get("def", None)
            is_obsolete = graph.nodes[node].get("is_obsolete", None)
            xref = graph.nodes[node].get("xref", None)

            node_prefix = node.split(":")[0].lower().rstrip()
            term = Term(name=name, accession=node, definition=definition, is_obsolete=is_obsolete,
                        ontology_origin=node_prefix)
            self.obo_file.terms.append(term)

            # add xrefs to relationships list
            if xref:
                for x_reference in xref:
                    node_prefix = x_reference.split(":")[0].lower().rstrip()
                    ontology_lastUpdated = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
                    if not self.ontology_available(node_prefix):
                        ontology = Ontology(name=node_prefix, lastUpdated=ontology_lastUpdated, author=None,
                                            version=None, generated=True)
                        self.obo_file.ontologies.append(ontology)

                    rel_type = "xref"
                    relationship = Relationships(node_from=node, node_to=x_reference, rel_type=rel_type)

                    if not self.term_available(x_reference):
                        term = Term(name=None, accession=x_reference, definition=None, is_obsolete=None,
                                    ontology_origin=node_prefix)
                        self.obo_file.terms.append(term)
                        self.obo_file.relationships.append(relationship)

            node_prefix = node.split(":")[0].lower().rstrip()
            if not self.ontology_available(node_prefix):
                ontology = Ontology(name=node_prefix, lastUpdated=ontology_lastUpdated, author=None,
                                    version=None, generated=True)
                self.obo_file.ontologies.append(ontology)

            # search all child nodes of current node and add to relation list
            for child, parent, rel_type in graph.out_edges(node, keys=True):

                relationship = Relationships(node_from=parent, node_to=child, rel_type=rel_type)
                self.obo_file.relationships.append(relationship)

                if not self.term_available(child):
                    node_prefix = node.split(":")[0].lower().rstrip()
                    term = Term(name=None, accession=child, definition=None, is_obsolete=None,
                                ontology_origin=node_prefix)
                    self.obo_file.terms.append(term)
                    self.obo_file.relationships.append(relationship)

        # print("task", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 /1024)

        print(self.obo_file.dict())

        return self.obo_file.dict()
