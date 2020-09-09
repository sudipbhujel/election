FROM python:3.8-alpine 

ENV PYTHONUNBUFFERED 1

RUN apk add --update --no-cache postgresql-client jpeg-dev \
        libgcc libjpeg-turbo libpng libstdc++ libx11 musl \
        openblas pkgconf make cmake
RUN apk add --update --no-cache --virtual .tmp-build-deps \
        gcc libc-dev linux-headers postgresql-dev \
        musl-dev zlib zlib-dev g++
        
COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt
RUN apk del .tmp-build-deps

RUN mkdir /backend
WORKDIR /backend
COPY ./backend /backend

RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static

RUN adduser -D user
RUN chown -R user:user /vol/
RUN chmod -R 755 /vol/web
USER user