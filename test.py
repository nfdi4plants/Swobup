import obonet
from io import StringIO

current_file = open("nfdi4plants_ontology.obo", "r")

# ontology_buffer = StringIO(current_file)

graph = obonet.read_obo(current_file, ignore_obsolete=False)

treat_equivalent = graph.graph.get("treat-xrefs-as-equivalent", [])
treat_as_relationship = graph.graph.get("treat-xrefs-as-relationship", [])
treat_isa = graph.graph.get("treat-xrefs-as-is_a", [])

print("isa", treat_isa)
print("isa", treat_equivalent)

treat_isa = [x.lower().split(" ") for x in treat_isa]
treat_equivalent = [x.lower().split(" ") for x in treat_equivalent]

if treat_isa is not []:
    treat_isa = treat_isa[-1]

if treat_equivalent is not []:
    treat_equivalent = treat_equivalent[-1]

for treat in treat_as_relationship:
    print("treat:", treat)
    relationships_dict = dict(x.lower().split(" ") for x in treat_as_relationship)

print(relationships_dict)
print("isa", treat_isa)
print("equi", treat_equivalent)

treat_rel = [x.lower().split(" ") for x in treat_as_relationship]

nodes = graph.nodes

for node in nodes:

    xref = graph.nodes[node].get("xref", None)

    if xref:
        for x_reference in xref:
            node_prefix = x_reference.split(":")[0].lower().rstrip()

            if node_prefix in treat_isa:
                print(node + " -is_a-> " + x_reference)

            if node_prefix in relationships_dict:
                print(node + " "+relationships_dict.get(node_prefix) +" " + x_reference)

            if node_prefix in treat_equivalent:
                print(node + " -equivalent-> " + x_reference)
                print(x_reference + " -equivalent-> " + node)
