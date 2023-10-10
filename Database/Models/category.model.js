import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [2, "Too Short Category Name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

categorySchema.post("init" , function(doc) {
  doc.image =  process.env.BASE_URL+"category/" + doc.image;
  console.log(doc);
})

export const categoryModel = model("category", categorySchema);
