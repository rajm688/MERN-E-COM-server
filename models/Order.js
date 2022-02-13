import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
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
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);
export default orderSchema = mongoose.model("Order", orderSchema);
