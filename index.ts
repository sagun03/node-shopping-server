import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectToMySQL} from './src/config/mysql';
import connectToMongoDB from './src/config/mongodb';
import router from './src/Router'
import setupSwagger from "./swagger";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
setupSwagger(app);
app.use("/jk", router)

// comment out if any databse is failing to connect.
const connectDatabases = async () => {
    try {
        // const mysqlConnection = await connectToMySQL();
        // console.log('MySQL Database connection established!');
        // const mysqlConnection = await connectToMySQL();
        // console.log('MySQL Database connection established!');
        
        const mongoDBConnection = await connectToMongoDB();
        console.log('MongoDB connection established!');

        return { mongoDBConnection }
        return { mongoDBConnection }
        
        // return { mysqlConnection, mongoDBConnection };
    } catch (error) {
        throw new Error('Failed to connect to databases');
    }
};

connectDatabases()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Express server started!');
        });
    })
    .catch((err: any) => {
        console.error(err.message);
    });0

