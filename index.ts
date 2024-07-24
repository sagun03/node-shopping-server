import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
import { connectToMySQL } from './src/config/mySql';
import connectToMongoDB from './src/config/mongoDB';
import router from './src/Router';
import setupSwagger from './swagger';
import consumerMessages from './src/utilities/consumer';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import admin from 'firebase-admin';
import { env } from "process";

import cookieParser from 'cookie-parser';
import { buffer } from "stream/consumers";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
setupSwagger(app);

// Routes
app.use("/jk", router);

// 404 Handler
app.use((req: Request, res: Response) => {
    res.status(404).send({ error: 'Not found' });
});

// Database Connections
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});


// comment out if any databse is failing to connect.
const connectDatabases = async () => {
    try {
        // const mysqlConnection = await connectToMySQL();
        // console.log('MySQL Database connection established!');
        
        const mongoDBConnection = await connectToMongoDB();
        console.log('MongoDB connection established!');
        
        // return { mysqlConnection, mongoDBConnection };
        return { mongoDBConnection };
    } catch (error) {
        throw new Error('Failed to connect to databases');
    }
};

// Kafka Consumer
const startKafkaConsumer = async () => {
    try {
        await consumerMessages();
        console.log('Kafka consumer started and listening...');
    } catch (error) {
        console.error('Error starting Kafka consumer:', error);
    }
};

// Start server after connecting databases and starting Kafka consumer
Promise.all([connectDatabases(), startKafkaConsumer()])
    .then(() => {
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Express server started on port ${port}`);
        });
    })
    .catch((err: any) => {
        console.error(err.message);
        process.exit(1); // Exit process on error
    });


Promise.all([connectDatabases()])
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log('Express server started!');
    });
})
.catch((err: any) => {
    console.error(err.message);
});
