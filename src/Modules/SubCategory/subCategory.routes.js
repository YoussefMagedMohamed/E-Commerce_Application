import express from "express";
import * as subCategory from "./subCategory.controller.js";
import { validate } from "../../Middleware/validate.js";
import { addSubCategoryValidation, deleteSubCategoryValidation, updateSubCategoryValidation } from "./subCategory.validation.js";

const subCategoryRouter = express.Router();

subCategoryRouter
  .route("/")
  .post(validate(addSubCategoryValidation),subCategory.addSubCategory)
  .get(subCategory.getAllSubCategories);

subCategoryRouter
  .route("/:id")
  .put(validate(updateSubCategoryValidation),subCategory.updateSubCategory)
  .delete(validate(deleteSubCategoryValidation),subCategory.deleteSubCategory)
  .get(subCategory.getOneSubCategory);

export default subCategoryRouter;
