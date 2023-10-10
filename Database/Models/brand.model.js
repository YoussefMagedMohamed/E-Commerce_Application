import mongoose, { Schema, model } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

brandSchema.post("init" , function(doc) {
  doc.logo =  process.env.BASE_URL+"brand/" + doc.logo;
  console.log(doc);
})

export const brandModel = model("brand", brandSchema);
