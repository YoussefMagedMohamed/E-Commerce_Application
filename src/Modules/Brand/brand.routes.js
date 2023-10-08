import express from "express";
import * as brand from "./brand.controller.js";

const brandRouter = express.Router();

brandRouter.route("/").post(brand.addBrand).get(brand.getAllBrands);

brandRouter
  .route("/:id")
  .put(brand.updateBrand)
  .delete(brand.deleteBrand)
  .get(brand.getOneBrand);

export default brandRouter;
