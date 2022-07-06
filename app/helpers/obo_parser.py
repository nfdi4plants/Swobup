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

    def parse(self):
        # try to read ontology file
        try:
            graph = obonet.read_obo(self.ontology_file, ignore_obsolete=False)

            # print(graph)

            # print("start task", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 / 1024)

        except Exception as e:
            sys.exit()

        try:
            ontology_name = graph.graph.get("name", None)
            ontology_author = graph.graph.get("saved-by", None)
            ontology_version = graph.graph.get("data-version", None)
            ontology_lastUpdated = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

            ontology = Ontology(name=ontology_name, lastUpdated=ontology_lastUpdated, author=ontology_author,
                                version=ontology_version, generated=False)
            self.obo_file.ontologies.append(ontology)
        except:
            print("name not found")

        try:
            nodes = graph.nodes
        except Exception as e:
            nodes = []

        # print("nodes #", nodes)

        # go through all nodes
        for node in nodes:

            # current_dict = dict()
            name = graph.nodes[node].get("name", None)
            if name is not None:
                name = name.strip()
                name = name.replace('^M', '')
            definition = graph.nodes[node].get("def", None)
            if definition is not None:
                definition = definition.strip()
            is_obsolete = graph.nodes[node].get("is_obsolete", None)
            xref = graph.nodes[node].get("xref", None)
            # xref_accession = ""

            if type(is_obsolete) is str:
                if is_obsolete.lower() is "true":
                    is_obsolete = True
                else:
                    is_obsolete = False

            # current_dict["accession"] = node
            # current_dict["name"] = name
            # current_dict["definition"] = definition
            # current_dict["is_obsolete"] = is_obsolete
            # current_dict["xref"] = xref

            term = Term(name=name, accession=node, definition=definition, is_obsolete=is_obsolete)
            self.obo_file.terms.append(term)

            # print("### CREF", graph.nodes[node])

            # add xrefs to relationships list
            if xref:
                for x_reference in xref:
                    # print("x_reference", x_reference)

                    node_prefix = x_reference.split(":")[0].lower().rstrip()
                    ontology_lastUpdated = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
                    if not self.ontology_available(node_prefix):
                        ontology = Ontology(name=node_prefix, lastUpdated=ontology_lastUpdated, author=None,
                                            version=None, generated=True)
                        self.obo_file.ontologies.append(ontology)

                    rel_type = "xref"
                    relationship = Relationships(node_from=node, node_to=x_reference, rel_type=rel_type)
                    self.obo_file.relationships.append(relationship)

            # current_dict["xref_accession"] = xref_accession
            # current_dict["ontology_name"] = ontology_name

            # current_accession = node

            node_prefix = node.split(":")[0].lower().rstrip()
            # current_dict["ontology_name"] = node_prefix
            # print("current prefix: ", node_prefix)

            if not self.ontology_available(node_prefix):
                ontology = Ontology(name=node_prefix, lastUpdated=ontology_lastUpdated, author=None,
                                    version=None, generated=True)
                self.obo_file.ontologies.append(ontology)

            # list_of_bool = [True for elem in self.ontolgies
            #                 if node_prefix in elem.values()]

            # list_of_bool = [True for elem in self.obo_file.ontologies
            #                 if node_prefix in elem.values()]

            # if not any(list_of_bool):
            #     print("found new prefix")
            #     print(self.ontolgies)
            #     ontology_dict = dict()
            #     ontology_dict["ontology_name"] = node_prefix
            #     ontology_dict["ontology_lastUpdated"] = "None"
            #     ontology_dict["ontology_author"] = "None"
            #     ontology_dict["ontology_version"] = "None"
            #     self.ontolgies.append(ontology_dict)
            #
            #     ontology_name = node_prefix
            #     ontology_author = None
            #     ontology_version = None
            #     ontology_lastUpdated = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

            # search all child nodes of current node and add to relation list
            for child, parent, rel_type in graph.out_edges(node, keys=True):
                # rel_types = []
                # relterm_dict = dict()

                # if rel_type not in current_dict:
                #     current_dict[rel_type] = []
                #     current_dict[rel_type].append(parent)
                # else:
                #     current_dict[rel_type].append(parent)

                # current_rel = dict()
                # current_rel["node_from"] = parent
                # current_rel["node_to"] = child
                # current_rel["rel_type"] = rel_type
                # self.relationships.append(current_rel)

                relationship = Relationships(node_from=parent, node_to=child, rel_type=rel_type)
                self.obo_file.relationships.append(relationship)

                # if rel_type not in rel_types:
                #     rel_types.append(rel_type)

            # self.metadata.append(current_dict)
        # print("task", getrusage(RUSAGE_SELF).ru_maxrss * 4096 / 1024 /1024)

        print(self.obo_file.dict())

        return self.obo_file.dict()
