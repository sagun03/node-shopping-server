import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const getEnvVar = (key: string) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
};

const host = getEnvVar('DB_HOST');
const user = getEnvVar('DB_USER');
const password = getEnvVar('DB_PASSWORD');
const database = getEnvVar('DB_DATABASE');

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql'
});

const connectToMySQL = async () => {
    console.log(database," : database name ")
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL!');
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
        throw err; // Throw the error for the caller to handle
    }
};

export { connectToMySQL, sequelize };
