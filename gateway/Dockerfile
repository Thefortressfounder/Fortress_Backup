FROM node:18-alpine

WORKDIR /app

# Install dependencies for crypto libraries (native modules)
RUN apk add --no-cache python3 make g++ git

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3003
CMD ["node", "server.js"]
