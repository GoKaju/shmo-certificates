FROM node:19-alpine AS builder
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install 
RUN npm run build
## this is stage two , where the app actually runs
FROM node:19-alpine AS app
WORKDIR /usr
COPY package.json ./
RUN npm install --production
COPY --from=0 /usr/dist .
# copy templates
COPY src/templates ./templates
CMD ["node","server.js"]
