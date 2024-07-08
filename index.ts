import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectToMySQL} from './src/config/mySql';
import connectToMongoDB from './src/config/mongoDB';
import router from './src/Router'
import setupSwagger from './swagger';
import emailTransporter from './src/emailConfig/emailTransporter';
import bodyParser from 'body-parser';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
setupSwagger(app)

app.use("/jk", router)

// comment out if any databse is failing to connect.
const connectDatabases = async () => {
    try {
        const mysqlConnection = await connectToMySQL();
        console.log('MySQL Database connection established!');
        
        const mongoDBConnection = await connectToMongoDB();
        console.log('MongoDB connection established!');

        
        return {mysqlConnection, mongoDBConnection };
    } catch (error) {
        throw new Error('Failed to connect to databases');
    }
};
connectDatabases()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log('Express server started!');
        });
    })
    .catch((err: any) => {
        console.error(err.message);
    });

