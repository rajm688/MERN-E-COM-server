import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    product: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          defaault: 1,
        },
      },
    ],
  },
  { timestamps: true }
);
export default cartSchema = mongoose.model("Cart", cartSchema);
