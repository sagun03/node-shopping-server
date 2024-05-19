// index.ts

import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from './src/config/mySql';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` }); 

const app: Application = express();

app.use(cors());
app.use(express.json());

// Handle database connection promise
database.databaseConnection()
    .then((con: any) => {
        console.log('Database connection established!');
        // Start your express server here
        app.listen(3000, () => {
            console.log('Express server started!');
        });
    })
    .catch((err: any) => {
        console.error('Failed to connect to database:', err);
    });

// Your routes and other middleware
