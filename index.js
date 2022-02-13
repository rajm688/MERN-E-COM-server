import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { authRouter } from "./router/auth.js";
import { userRoute } from "./router/user.js";
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Error in connectiong to DB", err.message));
app.use("/auth", authRouter);
app.use("/user", userRoute);
app.listen(PORT, () => console.log("server started"));
