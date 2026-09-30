FROM node:20-alpine
WORKDIR /app

# Install dependencies first so Docker caches this layer
COPY package*.json ./
RUN npm install --omit=dev

COPY src ./src

ENV NODE_ENV=production
EXPOSE 3000
USER node
CMD ["node", "src/server.js"]