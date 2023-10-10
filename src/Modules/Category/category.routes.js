import express from "express";
import * as category from "./category.controller.js";
import { validate } from "../../Middleware/validate.js";
import { addCategoryValidation, deleteCategoryValidation, updateCategoryValidation } from "./category.validation.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(validate(addCategoryValidation),category.addCategory)
  .get(category.getAllCategories);

categoryRouter
  .route("/:id")
  .put(validate(updateCategoryValidation),category.updateCategory)
  .delete(validate(deleteCategoryValidation),category.deleteCategory)
  .get(category.getOneCategory);

export default categoryRouter;
