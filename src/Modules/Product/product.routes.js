import express from "express";
import * as product from "./product.controller.js";

const productRouter = express.Router();

productRouter.route("/").post(product.addProduct).get(product.getAllProducts);

productRouter
  .route("/:id")
  .put(product.updateProduct)
  .delete(product.deleteProduct)
  .get(product.getOneProduct);

export default productRouter;
