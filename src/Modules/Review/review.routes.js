import express from "express";
import * as review from "./review.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";

const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .post(protectedRoutes, allowedTo("user"), review.addReview)
  .get(review.getAllReviews);

reviewRouter
  .route("/:id")
  .put(protectedRoutes, allowedTo("user"), review.updateReview)
  .delete(protectedRoutes, allowedTo("admin", "user"), review.deleteReview)
  .get(review.getOneReview);

export default reviewRouter;
