FROM python:3.9

WORKDIR /swobup

COPY ./requirements.txt /swobup/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /swobup/requirements.txt

COPY . /swobup

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
CMD ["celery", "-A" ,"swobup.tasks", "worker", "-l", "info"]
CMD ["celery", "-A", "swobup.tasks", "flower", "-l", "info", "--port", "1111"]