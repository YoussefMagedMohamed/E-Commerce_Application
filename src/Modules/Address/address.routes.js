import express from "express";
import * as addresses from "./address.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";

const addressRouter = express.Router();

addressRouter
  .route("/")
  .patch(protectedRoutes, allowedTo("user"),addresses.addAddress)
  .delete(protectedRoutes, allowedTo("user"),addresses.removeAddress)
  .get(protectedRoutes, allowedTo("user"),addresses.getAllUserAddresses);

export default addressRouter;
