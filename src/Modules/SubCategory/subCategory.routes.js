import express from "express";
import * as subCategory from "./subCategory.controller.js";

const subCategoryRouter = express.Router();

subCategoryRouter
  .route("/")
  .post(subCategory.addSubCategory)
  .get(subCategory.getAllSubCategories);

subCategoryRouter
  .route("/:id")
  .put(subCategory.updateSubCategory)
  .delete(subCategory.deleteSubCategory)
  .get(subCategory.getOneSubCategory);

export default subCategoryRouter;
