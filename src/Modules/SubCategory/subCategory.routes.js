import express from "express";
import * as subCategory from "./subCategory.controller.js";
import { validate } from "../../Middleware/validate.js";
import {
  addSubCategoryValidation,
  deleteSubCategoryValidation,
  updateSubCategoryValidation,
} from "./subCategory.validation.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";

const subCategoryRouter = express.Router();

subCategoryRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    validate(addSubCategoryValidation),
    subCategory.addSubCategory
  )
  .get(subCategory.getAllSubCategories);

subCategoryRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin"),
    validate(updateSubCategoryValidation),
    subCategory.updateSubCategory
  )
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validate(deleteSubCategoryValidation),
    subCategory.deleteSubCategory
  )
  .get(subCategory.getOneSubCategory);

export default subCategoryRouter;
