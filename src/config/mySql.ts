import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Function to retrieve environment variables and ensure they are set
const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

// Retrieve configuration values from environment variables
const host: string = getEnvVar("DB_HOST");
const user: string = getEnvVar("DB_USER");
const password: string = getEnvVar("DB_PASSWORD");
const database: string = getEnvVar("DB_DATABASE");
const caCertPath: string = getEnvVar("DB_CA_CERT_PATH");

// Check if the CA certificate file exists
if (!fs.existsSync(caCertPath)) {
  throw new Error(`CA certificate file not found at ${caCertPath}`);
}

// Read the CA certificate file
let caCert: Buffer;
try {
  caCert = fs.readFileSync(caCertPath);
  console.log("CA certificate file successfully read.");
} catch (error) {
  console.error("Error reading CA certificate file:", error);
  throw error;
}

// Create a Sequelize instance with SSL configuration
const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // Set to true for production to reject unauthorized certificates
      ca: caCert, // Provide the CA certificate
    },
  },
});

// Function to connect to MySQL and test the connection
const connectToMySQL = async () => {
  console.log(`Connecting to database: ${database}`);
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL!");
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
    throw err; // Throw the error for the caller to handle
  }
};

// Export the connection function and sequelize instance
export { connectToMySQL, sequelize };
