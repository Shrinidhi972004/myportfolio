# Use the official Node.js image.
FROM node:20-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the source code
COPY . .

# Expose the backend port (change if needed)
EXPOSE 5000

# Set environment variable to production (optional but good practice)
ENV NODE_ENV=production

# Start the server (change app.js/server.js as per your entry file)
CMD ["node", "server.js"]
