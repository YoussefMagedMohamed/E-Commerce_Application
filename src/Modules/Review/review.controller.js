import { reviewModel } from "../../../Database/Models/review.model.js";
import { ApiFeatures } from "../../Utils/ApiFeatures.js";
import { AppError } from "../../Utils/AppError.js";
import { catchError } from "../../Utils/catchError.js";

// Add New Review
const addReview = catchError(async (req, res, next) => {

  const review = new reviewModel(req.body);
  await review.save();
  res.status(201).json({ message: "Success", review });
});

// Get All Reviews
const getAllReviews = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(reviewModel.find(), req.query)
    .paginate()
    .filter()
    .search()
    .sort()
    .selectedFields();
  let reviews = await apiFeatures.mongooseQuery;
  res
    .status(201)
    .json({
      message: "Success",
      CurrentPage: apiFeatures.CurrentPage,
      reviews,
    });
});

// Get Specific Review
const getOneReview = catchError(async (req, res, next) => {
  let { id } = req.params;
  let review = await reviewModel.findById(id);
  !review && next(new AppError("Review Not Found", 404));
  review && res.status(201).json({ message: "Success", review });
});

// Update Review
const updateReview = catchError(async (req, res, next) => {
  let { id } = req.params;
  let review = await reviewModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !review && next(new AppError("Review Not Found", 404));
  review && res.status(201).json({ message: "Success", review });
});

// Delete Review
const deleteReview = catchError(async (req, res, next) => {
  let { id } = req.params;
  let review = await reviewModel.findByIdAndDelete(id);
  !review && next(new AppError("Review Not Found", 404));
  review && res.status(201).json({ message: "Success", review });
});

export { addReview, getAllReviews, getOneReview, deleteReview, updateReview };
