## Stage 1
# Build Angular Project
# Copy Angular dist files to NestJs
FROM node:18 AS ui-build
WORKDIR /usr/src/app
COPY ../myblog-ui/ ./myblog-ui/

RUN npm install @angular/cli -g

RUN cd myblog-ui && npm ci

WORKDIR /usr/src/app/myblog-ui

RUN ng build

## Stage 2
# Build NestJs
# Deploy
FROM node:18 AS api-build
WORKDIR /usr/src/app
COPY ./ ./myblog-api/

COPY --from=ui-build /usr/src/app/myblog-ui/dist/ ./myblog-api/

RUN cd myblog-api && npm ci

WORKDIR /usr/src/app/myblog-api

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
