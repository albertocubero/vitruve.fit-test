FROM node:18

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

ENV CI=true
ENV NX_CACHE_OUTPUTS=false
ENV NPM_CONFIG_IGNORE_SCRIPTS=true
ENV NX_PLUGIN_NO_TIMEOUTS=true

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

COPY package.json package-lock.json nx.json ./
COPY packages/backend/package.json ./packages/backend/
COPY tsconfig.base.json ./
COPY packages/backend ./packages/backend

RUN npm ci

COPY . .

COPY /packages/backend/wait-for-db.sh ./packages/backend/wait-for-db.sh
RUN chmod +x ./packages/backend/wait-for-db.sh

EXPOSE 3000