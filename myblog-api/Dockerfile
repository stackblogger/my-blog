# Build NestJs
# Deploy
FROM node:18 AS api-build
WORKDIR /usr/src/app
COPY ./ ./myblog-api/

COPY --from=ui-build /usr/src/app/myblog-ui/dist/ ./myblog-api/

RUN cd myblog-api && npm ci

RUN npm install pm2 -g

WORKDIR /usr/src/app/myblog-api

RUN npm run build

EXPOSE 3000

CMD [ "pm2", "start", "dist/main.js" ]
