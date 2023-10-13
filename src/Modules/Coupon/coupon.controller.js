import { couponModel } from "../../../Database/Models/coupon.model.js";
import { ApiFeatures } from "../../Utils/ApiFeatures.js";
import { AppError } from "../../Utils/AppError.js";
import { catchError } from "../../Utils/catchError.js";
import Qrcode from "qrcode"

// Add New Coupon
const addCoupon = catchError(async (req, res, next) => {
  const coupon = new couponModel(req.body);
  await coupon.save();
  res.status(201).json({ message: "Success", coupon });
});

// Get All Coupons
const getAllCoupons = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(couponModel.find(), req.query)
    .paginate()
    .filter()
    .search()
    .sort()
    .selectedFields();
  let coupons = await apiFeatures.mongooseQuery;
  res
    .status(201)
    .json({
      message: "Success",
      CurrentPage: apiFeatures.CurrentPage,
      coupons,
    });
});

// Get Specific Coupon
const getOneCoupon = catchError(async (req, res, next) => {
  let { id } = req.params;
  let coupon = await couponModel.findById(id);
  let url = await Qrcode.toDataURL(coupon.code)
  !coupon && next(new AppError("Coupon Not Found", 404));
  coupon && res.status(201).json({ message: "Success", coupon , url });
});

// Update Coupon
const updateCoupon = catchError(async (req, res, next) => {
  let { id } = req.params;
  let coupon = await couponModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !coupon && next(new AppError("Coupon Not Found", 404));
  coupon && res.status(201).json({ message: "Success", coupon });
});

// Delete Coupon
const deleteCoupon = catchError(async (req, res, next) => {
  let { id } = req.params;
  let coupon = await couponModel.findByIdAndDelete(id);
  !coupon && next(new AppError("Coupon Not Found", 404));
  coupon && res.status(201).json({ message: "Success", coupon });
});

export { addCoupon, getAllCoupons, getOneCoupon, deleteCoupon, updateCoupon };
