FROM node:14-alpine

RUN mkdir /frontend-react
WORKDIR /frontend-react

COPY ./frontend-react/package.json ./
RUN yarn install

COPY ./frontend-react ./
