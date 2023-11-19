FROM node:16.17.0-alpine as builder
WORKDIR /app
COPY ./package.json .
