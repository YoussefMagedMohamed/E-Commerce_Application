import { Schema, model } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    expires: {
      type: Date,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export const couponModel = model("coupon", couponSchema);
