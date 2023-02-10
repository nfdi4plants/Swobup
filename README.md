<h1 align="center">Swobup</h1>
<h3 align="center">The Swate OBO Updater</h3>

---

<p align="center">

<img alt="Logo Banner"
src="https://raw.githubusercontent.com/Zerskk/Branding/master/logos/Swobup/logo-text/logo-blue-text.png" width="auto"
height="auto"/>

[//]: # (<img alt="Logo Banner" src="https://raw.githubusercontent.com/nfdi4plants/Branding/master/logos/Swobup/logo/logo-blue.png" width="auto" height=" 400"/>)

</p>

---

Swobup (Swate OBO Updater) is a tool to synchronize terms in a previously defined OBO file uploaded to a Github
repository by an authorized user. Also Swobup can be used to synchronize templates with the Swate database by committing
templates to defined sharedGithub repository for them.
Swobup parses the OBO or template file and incorporates the changes into the Swate database. The user then has the
updated templates or terms available in the Swate tool without having to manually create templates or enter individual
terms.

## Installation

We recommend an installation with docker compose. Below is an example of a docker compose file. Some environment
variables need to be set. If you choose S3 as the storage backend that swobup uses to store intermediate results, the s3
parameters must be set, otherwise set storage_backend to 'local'. The password of the DB_Password variable must match
the password in the NEO4j_AUTH variable. Further configuration variables are specified in the section 'Configuration
with .env
file'.

```
version: '3.8'
services:
  redis:
    image: redis:6.2-alpine
    container_name: redis
    restart: always
    ports:
      - '127.0.0.1:6379:6379'
    command: redis-server --save 20 1 --loglevel warning
    volumes:
      - ./cache:/data
    networks:
      - swobup_network
  neo4j:
    image: neo4j:latest
    container_name: neo4j
    ports:
      - "0.0.0.0:7474:7474"
      - "0.0.0.0:7687:7687"
    networks:
      - swobup_network
    environment:
      - NEO4J_AUTH=neo4j/<PASSWORD>
      - NEO4J_server_memory_pagecache_size=7G
      - NEO4J_server_memory_heap_initial__size=5G
      - NEO4J_server_memory_heap_max__size=5G
      - NEO4J_dbms_default__listen__address=0.0.0.0
      - NEO4J_dbms_default__advertised__address=<REPLACE WITH LOCAL IP ADDRESS>
      - NEO4J_dbms.connector.bolt.address=0.0.0.0:7687
      - NEO4JLABS_PLUGINS=["graph-data-science", "apoc"]
      - NEO4J_dbms_security_procedures_unrestricted=algo.*, apoc.*
      - NEO4J_server_jvm_additional='-XX:+ExitOnOutOfMemoryError'

    volumes:
      - ${HOME}/neo4j/data:/data
      - ${HOME}/neo4j/logs:/logs
      - ${HOME}/neo4j/import:/var/lib/neo4j/import
      - ${HOME}/neo4j/plugins:/plugins
      #- ${HOME}/neo4j/conf:/conf
    restart: unless-stopped
  swobup:
    container_name: swobup
    environment:
      - CELERY_BROKER=redis://redis:6379/0
      - CELERY_BACKEND=redis://redis:6379/0
      - SWOBUP_DATASTORAGE = [local|s3]
      - s3_access_key_id=
      - s3_secret_access_key=
      - s3_bucket=
      - s3_base_path=/swobup
      - s3_endpoint_url=
      - s3_region=us-east-1
      - CELERY_S3_BUCKET=
      - SWOBUP_USERNAME=
      - SWOBUP_PASSWORD=
      - GITHUB_SECRET=
      - DB_URL=bolt://neo4j:7687
      - DB_USER=neo4j
      - DB_PASSWORD=
      - DB_BATCH_SIZE=500000
      - ONTOLOGY_REPOSITORY=nfdi4plants/nfdi4plants_ontology
      - TEMPLATE_REPOSITORY=nfdi4plants/SWATE_templates
      - SWATE_API=https://swate.nfdi4plants.org
      #- TURN_OFF_SSL_VERIFY=True
      - SWOBUP_DATASTORAGE=local
      - MAIL_NOTIFICATION=[on | off]
      - MAIL_METHOD=[smtps | tls]
      - MAIL_SERVER=
      - MAIL_USERNAME= # username is optional, if not given sender will be used
      - MAIL_PASSWORD=
      - MAIL_PORT=
      - MAIL_SENDER=
      - MAIL_ADDITIONAL_RECEIVER=

    image: ghcr.io/nfdi4plants/swobup:main
    ports:
      - "8000:8000"
      - "1111:1111"
    networks:
      - swobup_network

networks:
  swobup_network:
    driver: bridge

```

It is recommended to use a proxy before Swobup so that traffic is directed to the open port 8000 and accepted at the
proxy on port 443.

#### Configuration with .env file:

Swobup can also run without Docker. In this case, an .env file must be created in the root folder of Swobup.
The parameters are listed below. Then swobup can be started with the following commands:

First the Celery worker has to be started:

```
celery -A tasks worker -l info &
```

After that Swobup has to be started:

```
uvicorn --workers 10 --host 0.0.0.0 --port 8000 main:app
```

```
# Celery Configuration
CELERY_BROKER = 'redis://localhost:6379/0'
CELERY_BACKEND = 'redis://localhost:6379/0'

# Swobup Storage Configuration
SWOBUP_DATASTORAGE = [local|s3]
s3_access_key_id = ''
s3_secret_access_key = ''
s3_bucket = ''
s3_base_path = ''
s3_endpoint_url = ''
s3_region = ''
CELERY_S3_BUCKET = ''

# Swobup Admin User Configuration
SWOBUP_USERNAME = ''
SWOBUP_PASSWORD = ''

# Swate API Configuration
# TURN_OFF_SSL_VERIFY=[True | False] # Optional development option, turn off ssl verification for swate api
SWATE_API = 'https://swate.nfdi4plants.org'


# Github Configuration
GITHUB_SECRET= ''
ONTOLOGY_REPOSITORY = 'nfdi4plants/nfdi4plants_ontology'
TEMPLATE_REPOSITORY = 'nfdi4plants/SWATE_templates'


# Neo4j Configuration
DB_URL = "bolt://localhost:7687"
DB_USER = "neo4j"
DB_PASSWORD = ""
DB_BATCH_SIZE=500000

# Mail Notification Settings
MAIL_NOTIFICATION = [on | off]
MAIL_METHOD = [smtps | tls]
MAIL_SERVER = ''
# username is optional, if not given sender will be used
MAIL_USERNAME = ""
MAIL_PASSWORD = ''
MAIL_PORT = ''
MAIL_SENDER = ''
MAIL_ADDITIONAL_RECEIVER = '' # list of mail adsresses seperated by comma (,)
```

#### Configuration

