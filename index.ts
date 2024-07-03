import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectToMySQL} from './src/config/mysql';
import connectToMongoDB from './src/config/mongodb';
import router from './src/Router'
<<<<<<< HEAD
import bodyParser from 'body-parser';
import setupSwagger from './swagger';
dotenv.config();
=======
import setupSwagger from './swagger';
import emailTransporter from './src/emailConfig/emailTransporter';
import bodyParser from 'body-parser';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
<<<<<<< HEAD
setupSwagger(app);
=======
setupSwagger(app)

>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
app.use("/jk", router)

// comment out if any databse is failing to connect.
const connectDatabases = async () => {
    try {
        // const mysqlConnection = await connectToMySQL();
        // console.log('MySQL Database connection established!');
        // // const mysqlConnection = await connectToMySQL();
        // // console.log('MySQL Database connection established!');
        
        const mongoDBConnection = await connectToMongoDB();
        console.log('MongoDB connection established!');

<<<<<<< HEAD
        return { mongoDBConnection }
        
        // return { mysqlConnection, mongoDBConnection };
=======
        
        return {mysqlConnection, mongoDBConnection };
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
    } catch (error) {
        throw new Error('Failed to connect to databases');
    }
};
connectDatabases()
    .then(() => {
<<<<<<< HEAD
        app.listen(process.env.PORT, () => {
=======
        app.listen(process.env.PORT || 4000, () => {
>>>>>>> 7a353fa127ae2b8be75d3b2b69317f1c7076d368
            console.log('Express server started!');
        });
    })
    .catch((err: any) => {
        console.error(err.message);
    });0

