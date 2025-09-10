# FROM node:20-alpine AS development-dependencies-env
# COPY . /app
# WORKDIR /app
# RUN npm ci

# FROM node:20-alpine AS production-dependencies-env
# COPY ./package.json package-lock.json /app/
# WORKDIR /app
# RUN npm ci --omit=dev

# FROM node:20-alpine AS build-env
# COPY . /app/
# COPY --from=development-dependencies-env /app/node_modules /app/node_modules
# WORKDIR /app
# RUN npm run build

# FROM node:20-alpine
# COPY ./package.json package-lock.json /app/
# COPY --from=production-dependencies-env /app/node_modules /app/node_modules
# COPY --from=build-env /app/build /app/build
# WORKDIR /app
# CMD ["npm", "run", "start"]

# Use an official Node.js 14 image as a base
FROM node:20
RUN useradd -ms /bin/bash -u 1001 app
USER app

# Set the working directory to /app
WORKDIR /usr/src/app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the application code to the working directory
# COPY . .
COPY --chown=app:app . .

# Expose the port that the app will run on
EXPOSE 3000

# build the app
RUN npm run build

# Run the command to start the development server
CMD ["npm", "start"]