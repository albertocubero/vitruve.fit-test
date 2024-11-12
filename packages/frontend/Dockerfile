FROM node:18-alpine

ENV CI=true
ENV NX_CACHE_OUTPUTS=false
ENV NPM_CONFIG_IGNORE_SCRIPTS=true

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

COPY package.json package-lock.json nx.json ./
COPY packages/frontend/package.json ./packages/frontend/
COPY tsconfig.base.json ./
COPY packages/frontend ./packages/frontend

RUN npm ci

COPY . .

EXPOSE 4200