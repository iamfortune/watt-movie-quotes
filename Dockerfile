ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine 
WORKDIR /app

COPY package.json .
COPY ./web/composer/package.json ./web/composer/package.json  
COPY ./web/db/package.json ./web/db/package.json 
COPY ./web/frontend/package.json ./web/frontend/package.json 

RUN --mount=type=bind,source=./package.json,target=./package.json \
    # --mount=type=bind,source=./package-lock.json,target=./package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm install

RUN --mount=type=bind,source=./web/composer/package.json,target=./web/composer/package.json \
    --mount=type=cache,target=/root/.npm \
    npm install

RUN --mount=type=bind,source=./web/db/package.json,target=./web/db/package.json \
    --mount=type=cache,target=/root/.npm \
    npm install

RUN --mount=type=bind,source=./web/frontend/package.json,target=./web/frontend/package.json \
    --mount=type=cache,target=/root/.npm \
    npm install

COPY . . 

RUN npm run build

EXPOSE 3042

CMD npm run start 

