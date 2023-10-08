import { brandModel } from "../../../Database/Models/brand.model.js";
import { AppError } from "../../Utils/AppError.js";
import { catchError } from "../../Utils/catchError.js";
import slugify from "slugify";

// Add New Brand
const addBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const brand = new brandModel(req.body);
  await brand.save();
  res.status(201).json({ message: "Success", brand });
});

// Get All Brands
const getAllBrands = catchError(async (req, res, next) => {
  let brands = await brandModel.find();
  res.status(201).json({ message: "Success", brands });
});

// Get Specific Brand
const getOneBrand = catchError(async (req, res, next) => {
  let { id } = req.params;
  let brand = await brandModel.findById(id);
  !brand && next(new AppError("Brand Not Found", 404));
  brand && res.status(201).json({ message: "Success", brand });
});

// Update Brand
const updateBrand = catchError(async (req, res, next) => {
  let { id } = req.params;
  req.body.slug = slugify(req.body.name);
  let brand = await brandModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !brand && next(new AppError("Brand Not Found", 404));
  brand && res.status(201).json({ message: "Success", brand });
});

// Delete Brand
const deleteBrand = catchError(async (req, res, next) => {
  let { id } = req.params;
  let brand = await brandModel.findByIdAndDelete(id);
  !brand && next(new AppError("Brand Not Found", 404));
  brand && res.status(201).json({ message: "Success", brand });
});

export {
  addBrand,
  getAllBrands,
  getOneBrand,
  deleteBrand,
  updateBrand,
};
