import express from "express";
import * as order from "./order.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";

const orderRouter = express.Router();

orderRouter
  .route("/")
  .get(protectedRoutes, allowedTo("user"), order.getSpecificOrder);

orderRouter.get("/all", order.getAllOrders);

orderRouter
  .route("/:id")
  .post(protectedRoutes, allowedTo("user"), order.createCashOrder);
// .put(protectedRoutes, allowedTo("user"), cart.updateQuantity);

export default orderRouter;
