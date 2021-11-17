const express = require("express");
const mongoose = require("mongoose")
const app = express();
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const cartRouter = require("./routes/cart");
const stripeRouter = require("./routes/stripe");
const productRouter = require("./routes/product");

const cors = require("cors")
dotenv.config();

app.use(cors());
mongoose.connect(process.env.MONGO_URL).then(() => console.log("db connection")).catch((err) => console.log(err, "error"))

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is runing")
})
console.log('inn here')
app.use(express.json())
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", stripeRouter);



