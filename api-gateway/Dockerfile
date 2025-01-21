FROM node:20-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ./api-gateway/package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application files
COPY ./shared-types ../shared-types
COPY ./shared-types ./shared-types

# Copy the rest of the application files
COPY ./api-gateway/ .
