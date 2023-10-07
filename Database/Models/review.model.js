import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    product: {
        type: Schema.ObjectId,
        ref: "product",
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: "user",
        required: true,
    },
    rate : {
        type: Number,
        min: 1,
        max: 5
    }
  },
  { timestamps: true }
);

export const reviewModel = model("review", reviewSchema);
