import express from "express";
import * as review from "./review.controller.js";

const reviewRouter = express.Router();

reviewRouter.route("/").post(review.addReview).get(review.getAllReviews);

reviewRouter
  .route("/:id")
  .put(review.updateReview)
  .delete(review.deleteReview)
  .get(review.getOneReview);

export default reviewRouter;
