import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import {
  verifyTokenandAdmin,
  verifyTokenandAuthorization,
} from "../middleware/tokenVer.js";
import { Cart } from "../models/Cart.js";
// create
router.post("/", verifyTokenandAuthorization, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedProduct = await newCart.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(err);
  }
});
// update
router.put("/", verifyTokenandAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(err);
  }
});

//delete method
router.delete("/:id", verifyTokenandAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user Cart
router.get("/:userId", verifyTokenandAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all Products
router.get("/", verifyTokenandAdmin, async (req, res) => {
  try {
    const allCart = await Cart.find();
    res.status(200).json(allCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const cartRouter = router;
