import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [8, "Too Short product Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      maxlength: [
        100,
        "Description Should Be less than or equal to 100 characters",
      ],
      minlength: [3, "Too Short description"],
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    imgCover: {
      type: String,
    },
    images: {
      type: [String],
    },
    category: {
      type: Schema.ObjectId,
      ref: "category",
      required: true,
    },
    subCategory: {
      type: Schema.ObjectId,
      ref: "subCategory",
      required: true,
    },
    brand: {
      type: Schema.ObjectId,
      ref: "brand",
      required: true,
    },
    raitingAvg: {
      type: Number,
      min: 1,
      max: 5,
    },
    raitingCount: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

export const productModel = model("product", productSchema);
