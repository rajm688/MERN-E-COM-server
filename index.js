import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { productRouter } from "./router/product.js";
import { authRouter } from "./router/auth.js";
import { userRoute } from "./router/user.js";
import { cartRouter } from "./router/cart.js";
import { orderRouter } from "./router/order.js";
import { stripeRouter } from "./router/stripe.js";
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Error in connectiong to DB", err.message));
app.use(cors());
app.use("/auth", authRouter);
app.use("/user", userRoute);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/order", orderRouter);
app.use("/checkout", stripeRouter);

app.listen(PORT, () => console.log("server started"));
