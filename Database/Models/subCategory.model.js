import mongoose, { Schema, model } from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [2, "Too Short SubCategory Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: Schema.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);

export const subCategoryModel = model("subCategory", subCategorySchema);
