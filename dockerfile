# Use the official Node.js image as the base image
FROM node:14 

WORKDIR /app

# Copy package.json and package-lock.json to the workdir
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the API source code to the workdir
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Command to run the app
CMD ["npm", "run", "dev"]
