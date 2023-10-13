import { userModel } from "../../../Database/Models/user.model.js";
import { AppError } from "../../Utils/AppError.js";
import { catchError } from "../../Utils/catchError.js";

// Update User To Add His Product To Wishlist
const addToWishlist = catchError(async (req, res, next) => {
  let { product } = req.body;
  let user = await userModel.findByIdAndUpdate(req.user._id, {$addToSet:{wishlist:product}}, {
    new: true,
  });
  !user && next(new AppError("Review Not Found", 404));
  user && res.status(201).json({ message: "Success", review });
});



export { addToWishlist };
