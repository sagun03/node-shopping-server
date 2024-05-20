import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connectToMySQL = () => {
    const con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });
    console.log(process.env.DB_DATABASE);

    return new Promise((resolve, reject) => {
        con.connect(err => {
            if (err) {
                console.error("Error connecting to MySQL:", err);
                reject(err); // Reject with error
            } else {
                console.log("Connected to MySQL!");
                resolve(con); // Resolve with connection object
            }
        });
    });
};

export default connectToMySQL;
