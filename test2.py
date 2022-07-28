list1 = ["a", "b", "c", "g"]
list2 = ["a", "d", "f"]

out = list(set(list2).difference(list1))

print(out)


# MATCH (t:Term{accession:"NFDI4PSO:0000031"})
# DETACH DELETE t
# RETURN count(*) as total