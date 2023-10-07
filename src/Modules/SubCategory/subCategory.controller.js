import { subCategoryModel } from "../../../Database/Models/subCategory.model.js";
import { AppError } from "../../Utils/AppError.js";
import { catchError } from "../../Utils/catchError.js";
import slugify from "slugify";

// Add New SubCategory
const addSubCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const subCategory = new subCategoryModel(req.body);
  await subCategory.save();
  res.status(201).json({ message: "Success", subCategory });
});

// Get All SubCategories
const getAllSubCategories = catchError(async (req, res, next) => {
  let subCategories = await subCategoryModel.find();
  res.status(201).json({ message: "Success", subCategories });
});

// Get Specific SubCategory
const getOneSubCategory = catchError(async (req, res, next) => {
  let { id } = req.params;
  let subCategory = await subCategoryModel.findById(id);
  !subCategory && next(new AppError("subCategory Not Found", 404));
  subCategory && res.status(201).json({ message: "Success", subCategory });
});

// Update SubCategory
const updateSubCategory = catchError(async (req, res, next) => {
  let { id } = req.params;
  req.body.slug = slugify(req.body.name);
  let subCategory = await subCategoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !subCategory && next(new AppError("subCategory Not Found", 404));
  subCategory && res.status(201).json({ message: "Success", subCategory });
});

// Delete SubCategory
const deleteSubCategory = catchError(async (req, res, next) => {
  let { id } = req.params;
  let subCategory = await subCategoryModel.findByIdAndDelete(id);
  !subCategory && next(new AppError("subCategory Not Found", 404));
  subCategory && res.status(201).json({ message: "Success", subCategory });
});

export {
  addSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
  getOneSubCategory,
};
