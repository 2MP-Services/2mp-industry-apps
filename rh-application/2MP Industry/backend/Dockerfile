# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN sed -i 's/127.0.0.1/db/g' config/config.json  

# Stage 2: Production
FROM node:18
WORKDIR /app
COPY --from=builder /app .
RUN npm install -g dockerize  
CMD dockerize -wait tcp://db:5432 -timeout 30s && node index.js