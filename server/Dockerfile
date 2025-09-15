# Use an official Node.js 14 image as a base
FROM node:20

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
EXPOSE 1337

# Run the command to start the development server
CMD ["npm", "run", "deveop"]