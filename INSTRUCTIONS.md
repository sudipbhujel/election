# Instructions:

1. Make `requirements.txt`
requirements.txt
```
Django==3.1
djangorestframework===3.11.1
```

2. Make `Dockerfile` 
Docker
```Dockerfile
FROM python:3.8-alpine

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt

RUN mkdir /backend
WORKDIR /backend
COPY ./backend /backend

RUN adduser -D user
USER user
```

3. Make `docker-compose.yml` file
```yml
version: "3"

services: 
    app:
        build: 
            context: .
        ports: 
            - "8000:8000"
        volumes: 
            - ./backend:/backend
        command: >
            sh -c "python manage.py runserver 0.0.0.0:8000"
```

4. $bash `docker-compose build`
5. $bash `docker-compose run app sh -c "django-admin startproject app ."`