FROM python:3.11

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . /code

CMD ["sh", "-c", "sleep 10 && alembic upgrade head && uvicorn main:app --host 0.0.0.0 --port 80"]
