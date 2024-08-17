# Use the official Node.js image as a base image
FROM node:18

# Set working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the CA certificate to the container
ARG DB_CA_CERT_PATH
COPY ${DB_CA_CERT_PATH} /src/MYSQL_SSL_CERT/ca-cert.pem

# Build TypeScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 4000

# Command to run your application
CMD ["npm", "start"]
