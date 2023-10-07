import { categoryModel } from "../../../Database/Models/category.model.js";
import slugify from "slugify";

// Add New Category
const addCategory = async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const category = new categoryModel(req.body);
  await category.save();

  res.status(201).json({ message: "Success", category });
};

// Get All Categories
const getAllCategories = async (req, res, next) => {
  let categories = await categoryModel.find();
  res.status(201).json({ message: "Success", categories });
};

// Get Specific Category
const getOneCategory = async (req, res, next) => {
  let { id } = req.params;
  let category = await categoryModel.findById(id);
  res.status(201).json({ message: "Success", category });
};

// Update Category
const updateCategory = async (req, res, next) => {
  let { id } = req.params;
  req.body.slug = slugify(req.body.name);
  let category = await categoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  category && res.status(201).json({ message: "Success", category });
  !category && res.status(404).json({ message: "Category Not Found" });
};

// Delete Category
const deleteCategory = async (req, res, next) => {
  let { id } = req.params;
  let category = await categoryModel.findByIdAndDelete(id);
  category && res.status(201).json({ message: "Success", category });
  !category && res.status(404).json({ message: "Category Not Found" });
};

export {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getOneCategory,
};
