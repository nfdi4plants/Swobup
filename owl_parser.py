from nxontology.imports import from_file

from nxontology.imports import pronto_to_multidigraph, multidigraph_to_digraph

import pronto
import sys

from nxontology import NXOntology
from collections import Counter


ms = pronto.Ontology.from_obo_library("ms.owl")

terms = ms.terms()

for term in terms:
    print(term)

relations = ms.relationships()

for relation in relations:
    print(relation)

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
