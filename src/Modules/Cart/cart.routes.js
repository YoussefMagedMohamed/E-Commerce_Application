import express from "express";
import * as cart from "./cart.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";

const cartRouter = express.Router();

cartRouter
  .route("/")
  .post(protectedRoutes, allowedTo("user"), cart.addToCart)
  .put(protectedRoutes, allowedTo("user"), cart.applyCoupon)
  .get(protectedRoutes, allowedTo("user"),cart.getLoggedUserCart);

cartRouter
  .route("/:id")
  .delete(protectedRoutes, allowedTo("user"), cart.removeProductFromCart)
  .put(protectedRoutes, allowedTo("user"), cart.updateQuantity);

export default cartRouter;
