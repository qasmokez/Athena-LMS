FROM node:20-alpine AS base

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the application port
EXPOSE 3000

# Build account-service
RUN npm build

# Define the command to run the application
CMD ["npm", "start"]
