# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
