import { categoryModel } from "../../../Database/Models/category.model.js";
import { ApiFeatures } from "../../Utils/ApiFeatures.js";
import { AppError } from "../../Utils/AppError.js";
import { catchError } from "../../Utils/catchError.js";
import slugify from "slugify";

// Add New Category
const addCategory = catchError(async (req, res, next) => {
  req.body.image = req.file.filename;
  req.body.slug = slugify(req.body.name);
  const category = new categoryModel(req.body);
  await category.save();

  res.status(201).json({ message: "Success", category });
});

// Get All Categories
const getAllCategories = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
    .paginate()
    .filter()
    .search()
    .sort()
    .selectedFields();
  let categories = await apiFeatures.mongooseQuery;
  res.status(201).json({
    message: "Success",
    CurrentPage: apiFeatures.CurrentPage,
    categories,
  });
});

// Get Specific Category
const getOneCategory = catchError(async (req, res, next) => {
  let { id } = req.params;
  let category = await categoryModel.findById(id);
  !category && next(new AppError("Category Not Found", 404));
  category && res.status(201).json({ message: "Success", category });
});

// Update Category
const updateCategory = catchError(async (req, res, next) => {
  let { id } = req.params;
  req.body.slug = slugify(req.body.name);
  let category = await categoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !category && next(new AppError("Category Not Found", 404));
  category && res.status(201).json({ message: "Success", category });
});

// Delete Category
const deleteCategory = catchError(async (req, res, next) => {
  let { id } = req.params;
  let category = await categoryModel.findByIdAndDelete(id);
  !category && next(new AppError("Category Not Found", 404));
  category && res.status(201).json({ message: "Success", category });
});

export {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getOneCategory,
};
