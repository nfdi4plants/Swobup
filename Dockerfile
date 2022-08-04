FROM python:3.9

WORKDIR /swobup

COPY ./requirements.txt /swobup/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /swobup/requirements.txt
# RUN pip install uvicorn[standard]

COPY . /swobup

RUN rm /swobup/.env
RUN rm /swobup/docker-compose.yml
RUN rm /swobup/.gitlab-ci.yml

COPY init.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/init.sh

EXPOSE 8000 1111

ENTRYPOINT ["init.sh"]
