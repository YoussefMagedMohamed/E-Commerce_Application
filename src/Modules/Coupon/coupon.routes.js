import express from "express";
import * as coupon from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";

const couponRouter = express.Router();

couponRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    coupon.addCoupon
  )
  .get(coupon.getAllCoupons);

couponRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin"),
    coupon.updateCoupon
  )
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    coupon.deleteCoupon
  )
  .get(coupon.getOneCoupon);

export default couponRouter;
