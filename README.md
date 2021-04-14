<h1 align="center">Swobup</h1>
<h3 align="center">The Swate OBO Updater</h3>

---

<p align="center">
<img alt="Logo Banner" src="https://github.com/Zerskk/Branding/blob/master/logos/Swobup/logo-text/logo-blue-text.png"/>

---

Swobup (Swate OBO Updater) is a tool to synchronize terms in a previously defined OBO file uploaded to a Github repository by an authorized user. Also Swobup can be used to synchronize templates with the Swate database by committing templates to defined sharedGithub repository for them. 
Swobup parses the OBO or template file and incorporates the changes into the Swate database. The user then has the updated templates or terms available in the Swate tool without having to manually create templates or enter individual terms.


## Installation

#### Create Virtual Environment
```
python3 -m venv /opt/oboswateupdater/.venv

```

#### Activate the virtual environment
```
cd /opt/oboswateupdater/
source .venv/bin/activate
```

#### Installation of packages in virtual environment
```
pip3 install falcon requests gunicorn sqlalchemy cryptography pymysql obonet
```

#### Example konfiguration Systemd:

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

#### example konfiguration Nginx:

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

#### Konfiguration of Swobup in /opt/oboswateupdater/swobup/config/swobup.conf:

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
