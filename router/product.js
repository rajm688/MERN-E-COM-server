import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import {
  verifyTokenandAdmin,
  verifyTokenandAuthorization,
} from "../middleware/tokenVer.js";
import { Products } from "../models/Products.js";
// create
router.post("/", verifyTokenandAdmin, async (req, res) => {
  const newProduct = new Products(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(err);
  }
});
// update
router.put("/", verifyTokenandAdmin, async (req, res) => {
  try {
    const updatedproduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedproduct);
  } catch (error) {
    res.status(500).json(err);
  }
});

//delete method
router.delete("/:id", verifyTokenandAdmin, async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get product
router.get("/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all Products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await Products.find().sort({ creaatedAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Products.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Products.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const productRouter = router;
