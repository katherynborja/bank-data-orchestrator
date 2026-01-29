# --- Stage 1: Build Angular Frontend ---
FROM node:20-alpine AS build-frontend
WORKDIR /app/client

# Copy frontend dependency files
COPY client/package*.json ./
RUN npm install

# Copy frontend source and build
COPY client/ ./
RUN npm run build -- --configuration=production

# --- Stage 2: Setup Node.js Backend ---
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy backend dependency files
COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

# Copy backend source
COPY server/ ./server/

# Copy built frontend from Stage 1 into backend's public folder
COPY --from=build-frontend /app/client/dist/client/browser ./server/public

# Expose the backend port
EXPOSE 3000

# Set working directory to server for execution
WORKDIR /app/server

# Start the application
CMD ["npm", "start"]
