import express from "express";
import * as category from "./category.controller.js";
import { validate } from "../../Middleware/validate.js";
import { addCategoryValidation, deleteCategoryValidation, updateCategoryValidation } from "./category.validation.js";
import { uploadSingleFile } from "../../Multer/multer.js";
import { protectedRoutes } from "../Auth/auth.controller.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(protectedRoutes,uploadSingleFile("image" , "category"),validate(addCategoryValidation),category.addCategory)
  .get(category.getAllCategories);

categoryRouter
  .route("/:id")
  .put(protectedRoutes,validate(updateCategoryValidation),category.updateCategory)
  .delete(protectedRoutes,validate(deleteCategoryValidation),category.deleteCategory)
  .get(category.getOneCategory);

export default categoryRouter;
