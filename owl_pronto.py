import pronto
import sys
import csv

url = "https://raw.githubusercontent.com/HUPO-PSI/psi-ms-CV/master/psi-ms.obo"

ontology = pronto.Ontology(handle=url, import_depth=1)


f = open('test-ont.csv', 'w')
writer = csv.writer(f)



print(len(ontology.terms()))

for term in sorted(ontology.terms()):
    print(term.id)
    writer.writerow(str(term.id))

f.close()