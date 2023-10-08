import { productModel } from "../../../Database/Models/product.model.js";
import { AppError } from "../../Utils/AppError.js";
import { catchError } from "../../Utils/catchError.js";
import slugify from "slugify";

// Add New Product
const addProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const product = new productModel(req.body);
  await product.save();
  res.status(201).json({ message: "Success", product });
});

// Get All Products
const getAllProducts = catchError(async (req, res, next) => {
  let products = await productModel.find();
  res.status(201).json({ message: "Success", products });
});

// Get Specific Product
const getOneProduct = catchError(async (req, res, next) => {
  let { id } = req.params;
  let product = await productModel.findById(id);
  !product && next(new AppError("Product Not Found", 404));
  product && res.status(201).json({ message: "Success", product });
});

// Update Product
const updateProduct = catchError(async (req, res, next) => {
  let { id } = req.params;
  req.body.slug = slugify(req.body.title);
  let product = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !product && next(new AppError("Product Not Found", 404));
  product && res.status(201).json({ message: "Success", product });
});

// Delete Product
const deleteProduct = catchError(async (req, res, next) => {
  let { id } = req.params;
  let product = await productModel.findByIdAndDelete(id);
  !product && next(new AppError("Product Not Found", 404));
  product && res.status(201).json({ message: "Success", product });
});

export {
  addProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
};
