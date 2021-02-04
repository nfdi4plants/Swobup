# Swobup

## Beschreibung
Swobup (Swate OBO Updater) dient zur Synchronisation von Terms in einer zuvor definierten OBO-File, die von einem authorisierten Benutzer in ein Github Repository hochgeladen wird. Swobup analysiert die OBO-File und arbeitet die Änderungen in die Swate-Datenbank ein. Der Nutzer hat die aktualisierten Terme anschließend in dem Swatetool zur Verfügung, ohne dass dieser einzelne Terme über das Tool manuell eintragen muss. 

## Installation

#### Erstellen der Virtual Environment
```
python3 -m venv /opt/oboswateupdater/.venv

```

#### Aktivieren der Virtual Environment
```
cd /opt/oboswateupdater/
source .venv/bin/activate
```

#### Installation der Packete in der Virtual Environment
```
pip3 install falcon requests gunicorn sqlalchemy cryptography pymysql obonet
```

#### Beispielkonfiguration Systemd:

```
[Unit]

Description = Gunicorn instance to serve the falcon Swate database updater

After=network.target

[Service]

User = <user>

Group = <group>

PIDFile = /tmp/gunicorn.pid

Environment="PATH=/opt/oboswateupdater/.venv/bin"

WorkingDirectory = /opt/oboswateupdater/

ExecStart=/opt/oboswateupdater/.venv/bin/gunicorn --workers 1 -b 127.0.0.1:8001 swobup.app

ExecReload=/bin/kill -s HUP $MAINPID

ExecStop=/bin/kill -s TERM $MAINPID


[Install]

WantedBy=multi-user.target

```

#### Beispielkonfiguration Nginx:

```
server {

    listen 80;
    server_name <url>;
    return 301 https://<url>$request_uri;

}

server {

    listen 443 ssl;
    server_name <url>;


    ssl_certificate     /etc/ssl/localcerts/swobup.pem;
    ssl_certificate_key /etc/ssl/localcerts/swobup.key;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    gzip off;

    location /api {


      proxy_pass http://localhost:8001;

    }

}

```

#### Konfiguration Swobup in /opt/oboswateupdater/swobup/config/swobup.conf:

```
[github]
secret : <secret>
hash_method: sha256
token: <token>
download_path: https://raw.githubusercontent.com
user: <github_user>
repository: nfdi4plants

[file]
name:nfdi4plants_ontology.obo
ontology: nfdi4pso

[database]
host: localhost
user: <db_user>
password: <password>
dbname: SwateDB

```
