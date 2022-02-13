import express from "express";
import { User } from "../models/users.js";
const router = express.Router();
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(500).send("error in saving user", err.mesage);
  }
});
export const authRouter = router;
