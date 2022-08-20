FROM python:3.9

WORKDIR /swobup

COPY ./requirements.txt /swobup/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /swobup/requirements.txt
# RUN pip install uvicorn[standard]
RUN pip install ultradict

COPY . /swobup

RUN rm /swobup/.env
RUN rm /swobup/docker-compose.yml
RUN rm /swobup/.gitlab-ci.yml

WORKDIR /swobup/app/search/ped_c/
# RUN python3 /swobup/app/search/ped_c/setup.py build
RUN python3 /swobup/app/search/ped_c/setup.py install

WORKDIR /swobup

COPY init.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/init.sh

EXPOSE 8000 1111

ENTRYPOINT ["init.sh"]
