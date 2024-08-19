# Use the official Node.js image as a base image
FROM node:18

# Create directory for CA certificate inside the Docker image
RUN mkdir -p /src/MYSQL_SSL_CERT

# Copy the CA certificate into the Docker image
# Ensure `MYSQL_SSL_CERT/ca-cert.pem` is in the Docker build context
COPY MYSQL_SSL_CERT/ca-cert.pem /src/MYSQL_SSL_CERT/ca-cert.pem

# Set up the working directory
WORKDIR /app

# Copy the application code into the Docker image
COPY . .

# Set environment variables
ENV DB_CA_CERT_PATH=/src/MYSQL_SSL_CERT/ca-cert.pem

# Install dependencies and run application
RUN npm install
CMD ["npm", "start"]