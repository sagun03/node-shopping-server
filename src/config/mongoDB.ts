import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable in your .env file");
}

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
            socketTimeoutMS: 45000, // 45 seconds timeout for socket
        });
        console.log("Connected to MongoDB!");
        const db = mongoose.connection.db;
        return db;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export const disposeConnection = async () => {
    try{
        await mongoose.disconnect();
        console.log("Disconnected from mongoDB!");
    } catch(error) {
        console.error("Error disconnecting from mongoDB");
        throw error;
    }
}
