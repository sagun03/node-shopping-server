import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const getEnvVar = (key: string) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
};

const host: string = getEnvVar('DB_HOST');
const user: string = getEnvVar('DB_USER');
const password: string = getEnvVar('DB_PASSWORD');
const database: string = getEnvVar('DB_DATABASE');
// commenting for deployment
// const caCertPath: string = getEnvVar('DB_CA_CERT_PATH');  // Path to the CA certificate

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,  // For production chnage to true
            // commenting for deployment

            // ca: fs.readFileSync(caCertPath),
        }
    }
});

const connectToMySQL = async () => {
    console.log(database, " : database name ");
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL!');
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
        throw err; // Throw the error for the caller to handle
    }
};

export { connectToMySQL, sequelize };
