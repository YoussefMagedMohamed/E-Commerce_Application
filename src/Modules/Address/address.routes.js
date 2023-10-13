import express from "express";
import * as addresses from "./address.controller.js";

const addressRouter = express.Router();

addressRouter
  .route("/")
  .patch(addresses.addAddress)
  .delete(addresses.removeAddress)
  .get(addresses.getAllUserAddresses);

export default addressRouter;
