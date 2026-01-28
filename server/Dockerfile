FROM node:20-alpine

WORKDIR /app

# Install dependencies first (caching layer)
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "src/index.js"]
