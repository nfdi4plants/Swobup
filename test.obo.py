#!/usr/bin/env python

import io
import requests
import sys

import obonet

# url = "https://raw.githubusercontent.com/HUPO-PSI/psi-mod-CV/master/PSI-MOD.obo"
# url = "https://raw.githubusercontent.com/obophenotype/cell-ontology/master/cl.obo"
# url = "https://proconsortium.org/download/current/pro_reasoned.obo"
url = "http://purl.obolibrary.org/obo/ncbitaxon.obo"
method = sys.argv[1]
match method:
    case "1":
        r = requests.get(url).content.decode()
        r = r.replace("\r", "")
        input = io.StringIO(r)
    case "2":
        r = requests.get(url).content.decode()
        input = io.StringIO(r, newline=None)
    case "3":
        r = requests.get(url, stream=True)
        r.raw.decode_content = True
        # https://github.com/urllib3/urllib3/issues/1305
        r.raw.auto_close = False
        input = io.TextIOWrapper(r.raw, newline=None)

obo = obonet.read_obo(input)
print(obo)

# for method in $(seq 3); do command time -v ./obo.py "$method"; done

# MultiDiGraph named 'pr' with 328666 nodes and 849939 edges
# 	Command being timed: "./obo.py 1"
# 	Elapsed (wall clock) time (h:mm:ss or m:ss): 1:08.72
# 	Maximum resident set size (kbytes): 1741580
# MultiDiGraph named 'pr' with 328666 nodes and 849939 edges
# 	Command being timed: "./obo.py 2"
# 	Elapsed (wall clock) time (h:mm:ss or m:ss): 1:08.00
# 	Maximum resident set size (kbytes): 1741468
# MultiDiGraph named 'pr' with 328666 nodes and 849939 edges
# 	Command being timed: "./obo.py 3"
# 	Elapsed (wall clock) time (h:mm:ss or m:ss): 0:40.73
# 	Maximum resident set size (kbytes): 1416704
