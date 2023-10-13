import express from "express";
import * as brand from "./brand.controller.js";
import { validate } from "../../Middleware/validate.js";
import {
  addBrandValidation,
  deleteBrandValidation,
  updateBrandValidation,
} from "./brand.validation.js";
import { uploadSingleFile } from "../../Multer/multer.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";

const brandRouter = express.Router();

brandRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "brand"),
    validate(addBrandValidation),
    brand.addBrand
  )
  .get(brand.getAllBrands);

brandRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin"),
    validate(updateBrandValidation),
    brand.updateBrand
  )
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validate(deleteBrandValidation),
    brand.deleteBrand
  )
  .get(brand.getOneBrand);

export default brandRouter;
