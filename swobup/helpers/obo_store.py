# from pobo import Parser
import obonet
import sys


class OboStore:
    def __init__(self, file):
        self.storage = []
        self.rel_storage = []
        self.error_storage = []
        # self.file = file
        # self.parser = Parser(file)
        self.graph = obonet.read_obo(file)

        self.stored_accessions = []

    def get_ontology(self):
        return str(self.graph)

    def get_version(self):
        return self.graph.graph["data-version"]

    def get_saved_by(self):
        return self.graph.graph["saved-by"]

    def get_name(self):
        return self.graph.name

    def parse(self, ontology_name):
        for item in self.graph.nodes:


            term_dict = dict()

            current = self.graph.nodes[item]

            current_name = current.get("name")
            current_definition = current.get("def")
            current_id = current.get("id")
            current_is_obsolete = current.get("isObsolete")
            current_isa = current.get("is_a")
            current_xref = current.get("xref")

            term_dict["Accession"] = item

            if current_name:
                self.stored_accessions.append(item)

            if current_name:
                term_dict["Name"] = current_name
            # else:
            # continue

            if current_definition:
                term_dict["Definition"] = current_definition
            else:
                continue

            if current_is_obsolete:
                term_dict["isObsolete"] = current_is_obsolete
            else:
                term_dict["isObsolete"] = 0

            if current_isa:
                isa_list = []
                for isa_tag in current_isa:
                    isa_list.append(isa_tag)
                term_dict["is_a"] = isa_list

            if current_xref:
                term_dict["XrefValueType"] = current_xref

            term_dict["FK_OntologyName"] = ontology_name

            self.add(term_dict)

    def add(self, item):
        self.storage.append(item)

    def accession_in_storage(self, accession_name):
        if accession_name in self.stored_accessions:
            return True
        else:
            return False

    def add_relation(self, item):
        #print("relation added", item)
        self.rel_storage.append(item)

    def add_rel(self, accession_id, term_related_id):
        rel_dict = dict()
        rel_dict["FK_TermAccession"] = accession_id
        rel_dict["RelationshipType"] = "is_a"
        rel_dict["FK_TermAccession_Related"] = term_related_id
        self.add_relation(rel_dict)

    def get_storage(self):
        #print("get_storage", self.storage)
        #print("stored", self.stored_accessions)
        return self.storage

    def get_relstorage(self):
        return self.rel_storage
