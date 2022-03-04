# TODO: Rewrite
FROM node:16-alpine AS builder_vite
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install --include dev
COPY . .
RUN npm run build

FROM golang:alpine AS builder_go
WORKDIR $GOPATH
COPY ./docker/healthcheck .
RUN GO111MODULE=off CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /go/bin/healthcheck

FROM nginx:alpine
ARG BRANCH=""
ARG COMMIT=""

COPY --from=builder_vite --chown=nginx:nginx /app/dist /usr/share/nginx/html
COPY --from=builder_go --chown=nginx:nginx /go/bin/healthcheck /usr/local/bin/healthcheck
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /var/cache/nginx

RUN apk --no-cache add --virtual native-deps tzdata
RUN ln -s /usr/share/zoneinfo/America/Phoenix /etc/localtime
RUN echo "America/Phoenix" > /etc/timezone

ENV NODE_ENV=production
ENV HEALTHCHECK_PORT=8080
ENV GIT_COMMIT=${COMMIT}
ENV GIT_BRANCH=${BRANCH}
LABEL git_commit=${COMMIT}
LABEL git_branch=${BRANCH}

USER nginx
EXPOSE 8080
HEALTHCHECK --start-period=15s --interval=1m --timeout=5s CMD /usr/local/bin/healthcheck
