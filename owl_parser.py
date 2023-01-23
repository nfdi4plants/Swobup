from nxontology.imports import from_file

from nxontology.imports import pronto_to_multidigraph, multidigraph_to_digraph

import pronto
import sys

from nxontology import NXOntology
from collections import Counter

url = "http://release.geneontology.org/2021-02-01/ontology/go-basic.json.gz"
# ms = pronto.Ontology.from_obo_library("ms.owl")
# ms = pronto.Ontology(handle="/home/marcel/GIT/swobup/ms.owl", import_depth=0)

ms = pronto.Ontology(handle=url, import_depth=0)




# nxo = from_file("/home/marcel/GIT/swobup/ms.owl")
# print(nxo.n_nodes)
#
# nodes = nxo.n_nodes
# for node in nodes:
#     try:
#         print("node: ", node)
#     except:
#         print("node already in graph")
#         continue
#
# sys.exit()

terms = ms.terms()

for term in terms:
    print("==============")
    print("TermID:", term.id)
    print("TERM Definition", term.definition)
    print("Term Name", term.name)
    print(term.relationships.values())
    print("==============")
    print("*****")
    for key in term.relationships.keys():
        print("key", key)
        print(term.relationships.get(key))


    relationships = term.relationships
    print("realtionships are", relationships)
    print("##", relationships.values())
    print("##", len(relationships.values()))
    for bla in relationships.values():
        print("relation found", bla)
        print(bla.names)
        for rel_terms in bla:
            print(rel_terms)
    for relation in relationships:
        print("--->", relation.relationships)
        print("name", relation.name)
        print("ID", relation.id)
        print("definition", relation.definition)
        print("definition", relation.relationships)
    print("*****")

# relations = ms.relationships()
#
# for relation in relations:
#     print(relation)

sys.exit()

url = "ms.owl"

nxo = from_file(url)


graph = nxo.graph.graph


print("done")

nodes = nxo.graph.nodes



go_pronto = pronto.Ontology(handle=url)
print("go", go_pronto)
go_multidigraph = pronto_to_multidigraph(go_pronto)

print("multi", go_multidigraph)
print("counter")
print(Counter(key for _, _, key in go_multidigraph.edges(keys=True)))

print("=====")

for node in go_multidigraph.nodes:
    print(node)
    print("--", go_multidigraph.nodes[node].get("name", None))
    print("--", go_multidigraph.nodes[node].get("definition", None))
    print("--", go_multidigraph.nodes[node].get("is_obsolete", None))
    print("--", go_multidigraph.nodes[node])


#print(go_multidigraph)

# print("->", go_multidigraph.edges(keys=True))
# for node, child, relation in go_multidigraph.edges(keys=True):
#     print(node +"-[" +relation +"]->" +child)

print("graph", graph)
print(graph.get("data_version"))
