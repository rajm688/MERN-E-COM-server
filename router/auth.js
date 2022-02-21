import express from "express";
import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
const router = express.Router();
//register
router.post("/register", async (req, res) => {
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log("error in saving user", err.message);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const unhashpassword = req.body.password;
    const user = await User.findOne({ username });
    if (user === null) {
      res.status(401).json({ message: "invalid username or password" });
      return;
    }
    const storedPassword = user.password;
    const matchpassword = await bcrypt.compare(unhashpassword, storedPassword);
    if (!matchpassword) {
      res.status(401).json({ message: "invalid username or password" });
      return;
    }
    const { password, ...others } = user._doc;
    const Token = Jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_Key,
      { expiresIn: "3d" }
    );
    res.status(200).json({ ...others, Token });
  } catch (error) {
    res.status(500).send("something went wrong in login ", error.message);
  }
});

export const authRouter = router;
