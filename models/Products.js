import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export const Products = mongoose.model("Products", productSchema);
