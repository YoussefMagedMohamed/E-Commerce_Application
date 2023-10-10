import express from "express";
import * as brand from "./brand.controller.js";
import { validate } from "../../Middleware/validate.js";
import { addBrandValidation, deleteBrandValidation, updateBrandValidation } from "./brand.validation.js";

const brandRouter = express.Router();

brandRouter.route("/").post(validate(addBrandValidation),brand.addBrand).get(brand.getAllBrands);

brandRouter
  .route("/:id")
  .put(validate(updateBrandValidation),brand.updateBrand)
  .delete(validate(deleteBrandValidation),brand.deleteBrand)
  .get(brand.getOneBrand);

export default brandRouter;
