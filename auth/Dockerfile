# Use a specific version of Node.js as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json from the `auth` directory
COPY auth/package.json auth/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY auth/ .

# Command to run the application
CMD ["npm", "start"]
