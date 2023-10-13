import express from "express";
import * as product from "./product.controller.js";
import { uploadMixOfFiles } from "../../Multer/multer.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";

const productRouter = express.Router();

let arrFields = [
  { name: "imgCover", maxCount: 1 },
  { name: "images", maxCount: 20 },
];

productRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin", "user"),
    uploadMixOfFiles(arrFields, "product"),
    product.addProduct
  )
  .get(product.getAllProducts);

productRouter
  .route("/:id")
  .put(protectedRoutes, allowedTo("admin"), product.updateProduct)
  .delete(protectedRoutes, allowedTo("admin"), product.deleteProduct)
  .get(product.getOneProduct);

export default productRouter;
