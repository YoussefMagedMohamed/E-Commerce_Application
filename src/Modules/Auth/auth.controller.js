import { userModel } from "../../../Database/Models/user.model.js";
import { AppError } from "../../Utils/AppError.js";
import { catchError } from "../../Utils/catchError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Sign Up
const signUp = catchError(async (req, res, next) => {
  // Check User Exists
  let isUser = await userModel.findOne({ email: req.body.email });
  if (isUser) return next(new AppError("User Already Exists", 409));
  const user = new userModel(req.body);
  await user.save();

  // Generate Token
  let token = jwt.sign(
    { email: user.email, name: user.name, id: user._id, role: user.role },
    "SignUpToken"
  );
  res.status(201).json({ message: "Success", token });
});

// Sign In
const signIn = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  // Check User Exists
  let user = await userModel.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    // Generate Token
    let token = jwt.sign(
      { email: user.email, name: user.name, id: user._id, role: user.role },
      "SignUpToken"
    );
    res.status(201).json({ message: "Success", token });
  } else {
    return next(new AppError("Incorrect Email Or Password", 409));
  }
});

// Authentication
export const protectedRoutes = catchError(async (req, res, next) => {
  // Check Token Exists
  let { token } = req.headers;
  if (!token) return next(new AppError("TOKEN NOT PROVIDED", 404));

  // Verify Token
  let decoded = await jwt.verify(token, "SignUpToken");

  // Check User Exists
  let user = await userModel.findById(decoded.id);
  if (!user) return next(new AppError("User Not Found", 401));

  // Check Token Expiration
  if (user.passwordChangedAt) {
    let changePasswordDate = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (changePasswordDate > decoded.iat)
      return next(new AppError("Password Changed , Please SignIn Again", 401));
  }

  req.user = user;
  next();
});

// Authorization
export const allowedTo = (...roles) => {
  return catchError(async (req,res,next) => {
    if (!roles.includes(req.user.role)) return next(new AppError("You are not authorized to access this route" , 401))
    next();
  })
};

export { signUp, signIn };
