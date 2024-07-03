import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable in your .env file");
}

const connectToMongoDB = async () => {
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

export default connectToMongoDB;
