import express from "express";
import * as category from "./category.controller.js";
import { validate } from "../../Middleware/validate.js";
import {
  addCategoryValidation,
  deleteCategoryValidation,
  updateCategoryValidation,
} from "./category.validation.js";
import { uploadSingleFile } from "../../Multer/multer.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "category"),
    validate(addCategoryValidation),
    category.addCategory
  )
  .get(category.getAllCategories);

categoryRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin"),
    validate(updateCategoryValidation),
    category.updateCategory
  )
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validate(deleteCategoryValidation),
    category.deleteCategory
  )
  .get(category.getOneCategory);

export default categoryRouter;
