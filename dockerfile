FROM node:18

# Set working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 4000

# Command to run your application
CMD ["npm", "start"]
