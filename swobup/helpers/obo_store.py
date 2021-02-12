# from pobo import Parser
import obonet


class OboStore:
    def __init__(self, file):
        self.storage = []
        self.rel_storage = []
        self.error_storage = []
        # self.file = file
        # self.parser = Parser(file)
        self.graph = obonet.read_obo(file)


    def get_ontology(self):
        return str(self.graph)

    def parse(self, ontology_id):

        for item in self.graph:
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
                term_dict["Name"] = current_name
            # else:
            # continue

            if current_definition:
                term_dict["Definition"] = current_definition
            else:
                continue

            # if current_id:
            # term_dict["Accession"] = current_id
            # term_dict["Accession"] = item

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

            term_dict["FK_OntologyID"] = ontology_id

            self.add(term_dict)

    def add(self, item):
        self.storage.append(item)

    def add_relation(self, item):
        self.rel_storage.append(item)

    def add_rel(self, accession_id, term_related_id):
        rel_dict = dict()
        rel_dict["FK_TermID"] = accession_id
        rel_dict["RelationshipType"] = "is_a"
        rel_dict["FK_TermID_Related"] = term_related_id
        self.add_relation(rel_dict)

    def get_storage(self):
        return self.storage

    def get_relstorage(self):
        return self.rel_storage
