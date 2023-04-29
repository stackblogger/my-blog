FROM node:18 AS ui-build
WORKDIR /usr/src/app
COPY ./ ./myblog-ui/

RUN npm install @angular/cli -g

RUN cd myblog-ui && npm ci

WORKDIR /usr/src/app/myblog-ui

RUN ng build
