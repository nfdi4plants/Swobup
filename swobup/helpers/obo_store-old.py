from pobo import Parser


class OboStore:
    def __init__(self, file):
        self.storage = []
        self.rel_storage = []
        # self.file = file
        print("file",file)
        self.parser = Parser(file)

    def parse(self):
        for stanza in self.parser:
            if stanza.name == "Term":
                term_dict = dict()
                for tag, value in stanza.tags.items():

                    # print(tag,value[-1])

                    if tag == "name":
                        term_dict["Name"] = value[-1]
                    if tag == "def":
                        term_dict["Definition"] = value[-1]
                        # print("def: ", value)
                    if tag == "id":
                        term_dict["Accession"] = value[-1]
                        accession = value[-1]
                        #print("id ", value[-1])
                    if tag == "osObsolete":
                        term_dict["isObsolete"] = value[-1]
                        # print("obsolete", value[-1])
                    else:
                        term_dict["isObsolete"] = 0
                    if tag == "is_a":
                        #term_dict["is_a"] = value[-1]
                        # print("is_a: ", value[-1])
                        isa_list = []
                        for isa_tag in value:
                            isa_list.append(isa_tag)
                        term_dict["is_a"] = isa_list
                        #term_dict["is_a"] = value[-1]

                    if tag == "xref":
                        term_dict["XrefValueType"] = value[-1]
                        # print("xref: ", value[-1])
                    term_dict["FK_OntologyID"] = "2"

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
