import mongoose, { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    cartItems: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "product" },
        quantity: Number,
        price: Number,
      },
    ],
    totalOrderPrice: Number,
    shippingAddress: {
      street: String,
      city: String,
      phone: String,
    },
    paymentMethod: { type: String, enum: ["card", "cash"], default: "cash" },
    isPaid: { type: Boolean, default: "false" },
    paidAt: Date,
    isDeleverd: { type: Boolean, default: "false" },
    deliveredAt : Date,
  },
  { timestamps: true }
);

export const orderModel = new model("order", orderSchema);
