#!/bin/bash

set -e

echo "starting swobup..."

echo "starting celery"
celery -A tasks worker -l info &
celery -A tasks worker --queues=database_queue --concurrency=1 -l info &
celery -A tasks flower -l info --port=1111 &
echo "starting uvicorn"
uvicorn --workers 10 --host 0.0.0.0 --port 8000 main:app