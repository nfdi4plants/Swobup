import obonet
import sys
import pandas
import re

from app.helpers.oboparsing.models.term import Term
from app.helpers.oboparsing.models.ontology import Ontology
from app.helpers.oboparsing.models.relationships import Relationships
from app.helpers.oboparsing.models.obo_file import OboFile


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

    def parse(self):
        # try to read ontology file
        try:
            graph = obonet.read_obo(self.ontology_file, ignore_obsolete=False)

            print(graph)

        except Exception as e:
            sys.exit()

        try:
            ontology_name = graph.graph.get("name")

            current_dict = dict()
            current_dict["ontology_name"] = ontology_name
            current_dict["ontology_lastUpdated"] = "None"
            current_dict["ontology_author"] = "None"
            current_dict["ontology_version"] = "None"

            ontology = Ontology(name=ontology_name, lastUpdated="None", author="None", version="None", generated=False)
            print("ontology", ontology)
            self.obo_file.ontologies = Ontology(name=ontology_name, lastUpdated="None", author="None", version="None", generated=False)
            self.obo_file.ontologies.append(ontology)

            self.ontolgies.append(current_dict)
        except:
            print("name not found")

        try:
            # graph = obonet.read_obo(ontology_buffer)
            nodes = graph.nodes
        except Exception as e:
            nodes = []

        print("nodes #", nodes)

        # go through all nodes
        for node in nodes:

            current_dict = dict()

            name = graph.nodes[node].get("name", None)
            definition = graph.nodes[node].get("def", None)
            is_obsolete = graph.nodes[node].get("is_obsolete", None)
            xref = graph.nodes[node].get("xref", None)
            xref_accession = ""

            # print("name:", name)
            #
            #
            # print("def", definition)
            # print("is obsolete", is_obsolete)
            # print("xref", xref)
            # print("xref acc", xref_accession)
            # print("Childs:")

            current_dict["accession"] = node
            current_dict["name"] = name
            current_dict["definition"] = definition
            current_dict["is_obsolete"] = is_obsolete
            current_dict["xref"] = xref

            print("### CREF", graph.nodes[node])

            current_dict["xref_accession"] = xref_accession
            # current_dict["ontology_name"] = ontology_name

            current_accession = node

            node_prefix = node.split(":")[0].lower().rstrip()
            current_dict["ontology_name"] = node_prefix
            # print("current prefix: ", node_prefix)

            list_of_bool = [True for elem in self.ontolgies
                            if node_prefix in elem.values()]

            if not any(list_of_bool):
                print("found new prefix")
                print(self.ontolgies)
                ontology_dict = dict()
                ontology_dict["ontology_name"] = node_prefix
                ontology_dict["ontology_lastUpdated"] = "None"
                ontology_dict["ontology_author"] = "None"
                ontology_dict["ontology_version"] = "None"
                self.ontolgies.append(ontology_dict)

            # self.metadata.append()

            # search all child nodes of current node and add to relation list
            for child, parent, rel_type in graph.out_edges(node, keys=True):
                rel_types = []
                relterm_dict = dict()
                # print(f'• {child} ⟶ {key} ⟶ {parent}')
                # print("child:", child)
                # print("type is:", key)

                if node == "GO:0000020":
                    print("node found", node)

                if node == "GO:0000022":
                    print(child, parent, rel_type)

                if rel_type not in current_dict:
                    if node == "GO:0000022":
                        print("creating rel_type")
                    current_dict[rel_type] = []
                    current_dict[rel_type].append(parent)
                else:
                    if node == "GO:0000022":
                        print("adding to rel_type", parent)
                    current_dict[rel_type].append(parent)

                current_rel = dict()
                current_rel["node_from"] = parent
                current_rel["node_to"] = child
                current_rel["rel_type"] = rel_type
                self.relationships.append(current_rel)

                # if rel_type not in rel_types:
                #     rel_types.append(rel_type)

            self.metadata.append(current_dict)

            # print("metadata", self.metadata)

        print("end")

        # print(nodes)

        # print("length", len(self.nodes))

        # print("metadata", self.metadata)

        print("Ontos", self.obo_file)
        print("Ontos", self.obo_file.dict())

        return (self.metadata)
