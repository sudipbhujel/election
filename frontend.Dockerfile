FROM node:14-alpine

RUN mkdir /frontend
WORKDIR /frontend

COPY ./frontend/package.json ./
RUN yarn install

COPY ./frontend ./
