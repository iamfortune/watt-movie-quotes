# Stage 1: Build
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

# Copy all package.json files
COPY package.json ./
COPY ./web/composer/package.json ./web/composer/package.json  
COPY ./web/db/package.json ./web/db/package.json 
COPY ./web/frontend/package.json ./web/frontend/package.json 

# Install all dependencies (including dev dependencies)
RUN --mount=type=cache,target=/root/.npm npm install

# Copy the rest of the project files and run the build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /app

# Copy only production dependencies
COPY package.json ./
COPY ./web/composer/package.json ./web/composer/package.json  
COPY ./web/db/package.json ./web/db/package.json 
COPY ./web/frontend/package.json ./web/frontend/package.json 

# Install only production dependencies
RUN --mount=type=cache,target=/root/.npm npm install --production

# Copy the built files from the build stage
COPY --from=build /app ./

# Expose the port
EXPOSE 3042

# Start the application
CMD npm run start
