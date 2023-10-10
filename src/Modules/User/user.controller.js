import { userModel } from "../../../Database/Models/user.model.js";
import { ApiFeatures } from "../../Utils/ApiFeatures.js";
import { AppError } from "../../Utils/AppError.js";
import { catchError } from "../../Utils/catchError.js";
import bcrypt from "bcrypt"

// Add New User
const addUser = catchError(async (req, res, next) => {
  const user = new userModel(req.body);
  await user.save();
  res.status(201).json({ message: "Success", user });
});

// Get All Users
const getAllUsers = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(userModel.find(), req.query)
    .paginate()
    .filter()
    .search()
    .sort()
    .selectedFields();
  let users = await apiFeatures.mongooseQuery;
  res
    .status(201)
    .json({ message: "Success", CurrentPage: apiFeatures.CurrentPage, users });
});

// Get Specific User
const getOneUser = catchError(async (req, res, next) => {
  let { id } = req.params;
  let user = await userModel.findById(id);
  !user && next(new AppError("User Not Found", 404));
  user && res.status(201).json({ message: "Success", user });
});

// Update User
const updateUser = catchError(async (req, res, next) => {
  let { id } = req.params;
  let user = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !user && next(new AppError("User Not Found", 404));
  user && res.status(201).json({ message: "Success", user });
});

// Change User Password
const changeUserPassword = catchError(async (req, res, next) => {
  let { id } = req.params;
  let user = await userModel.findByIdAndUpdate(id, {password : req.body.password}, {
    new: true,
  });
  !user && next(new AppError("User Not Found", 404));
  user && res.status(201).json({ message: "Success", user });
});

// Delete User
const deleteUser = catchError(async (req, res, next) => {
  let { id } = req.params;
  let user = await userModel.findByIdAndDelete(id);
  !user && next(new AppError("User Not Found", 404));
  user && res.status(201).json({ message: "Success", user });
});

export { addUser, getAllUsers, getOneUser, deleteUser, updateUser , changeUserPassword };
