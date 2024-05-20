import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable in your .env file");
}

const client = new MongoClient(uri);

const connectToMongoDB = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        return client.db();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export default connectToMongoDB;
