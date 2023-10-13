import { userModel } from "../../../Database/Models/user.model.js";
import { AppError } from "../../Utils/AppError.js";
import { catchError } from "../../Utils/catchError.js";

// Update User To Add Addresses
const addAddress = catchError(async (req, res, next) => {
  let result = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { addresses: req.body } },
    {
      new: true,
    }
  );
  !result && next(new AppError("User Not Found", 404));
  result &&
    res.status(201).json({ message: "Success", result: result.addresses });
});

// Remove Addresses
const removeAddress = catchError(async (req, res, next) => {
  let result = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { addresses: { _id: req.body.address } } },
    {
      new: true,
    }
  );
  !result && next(new AppError("User Not Found", 404));
  result &&
    res.status(201).json({ message: "Success", result: result.addresses });
});

// Get All Addresses
const getAllUserAddresses = catchError(async (req, res, next) => {
  let result = await userModel.findOne({ _id: req.user._id });
  !result && next(new AppError("User Not Found", 404));
  result &&
    res.status(201).json({ message: "Success", result: result.addresses });
});

export { addAddress, removeAddress, getAllUserAddresses };
