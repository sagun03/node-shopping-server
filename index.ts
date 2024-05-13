import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import orderRouter from "./routes/order";
import cartRouter from "./routes/cart";
import stripeRouter from "./routes/stripe";
import productRouter from "./routes/product";
import cors from "cors";
import mysql from "mysql";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// MySQL Connection
const mysqlConnection = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DB || "your_database",
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("MySQL connected");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", stripeRouter);
