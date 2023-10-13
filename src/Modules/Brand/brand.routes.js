import express from "express";
import * as brand from "./brand.controller.js";
import { validate } from "../../Middleware/validate.js";
import { addBrandValidation, deleteBrandValidation, updateBrandValidation } from "./brand.validation.js";
import { uploadSingleFile } from "../../Multer/multer.js";
import { protectedRoutes } from "../Auth/auth.controller.js";

const brandRouter = express.Router();

brandRouter.route("/").post(protectedRoutes,uploadSingleFile("image" , "brand"),validate(addBrandValidation),brand.addBrand).get(brand.getAllBrands);

brandRouter
  .route("/:id")
  .put(validate(protectedRoutes,updateBrandValidation),brand.updateBrand)
  .delete(protectedRoutes,validate(deleteBrandValidation),brand.deleteBrand)
  .get(brand.getOneBrand);

export default brandRouter;
