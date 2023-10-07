import express from "express";
import * as category from "./category.controller.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(category.addCategory)
  .get(category.getAllCategories);

categoryRouter
  .route("/:id")
  .put(category.updateCategory)
  .delete(category.deleteCategory)
  .get(category.getOneCategory);

export default categoryRouter;
