# Stage 1: Build stage
FROM node:20.14.0-slim AS build

# Install necessary dependencies for Wasp and other tools
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    openssl \
    pkg-config \
    python-is-python3 \
    && rm -rf /var/lib/apt/lists/*

# Install Wasp
RUN curl -sSL https://get.wasp-lang.dev/installer.sh | sh

# Add Wasp to the PATH
ENV PATH="/root/.local/bin:${PATH}"

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build Wasp project
RUN wasp build

# Stage 2: Production stage
FROM node:20.14.0-slim

# Install necessary runtime dependencies for Wasp and other tools
RUN apt-get update && apt-get install -y \
    curl \
    openssl \
    && rm -rf /var/lib/apt/lists/ \
    && curl -sSL https://get.wasp-lang.dev/installer.sh | sh

# Add Wasp to the PATH
ENV PATH="/root/.local/bin:${PATH}"

# Set working directory
WORKDIR /app

# Copy built files from the build stage
COPY --from=build /app /app
COPY --from=build /root/.local/bin/wasp /usr/local/bin/wasp

# Set environment variables
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://postgresWaspDevUser:postgresWaspDevPass@db:5432/OpenSaaS-5209e55c9d

# Expose ports for both client and server
EXPOSE 3000
EXPOSE 3001

# Start the server and client, then run database migration
CMD wasp start && wasp db migrate-dev
