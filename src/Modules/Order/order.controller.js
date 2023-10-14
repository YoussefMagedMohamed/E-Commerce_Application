import { cartModel } from "../../../Database/Models/cart.model.js";
import { couponModel } from "../../../Database/Models/coupon.model.js";
import { orderModel } from "../../../Database/Models/order.model.js";
import { productModel } from "../../../Database/Models/product.model.js";
import { AppError } from "../../Utils/AppError.js";
import { catchError } from "../../Utils/catchError.js";

// Create a new Cash Order
const createCashOrder = catchError(async (req, res, next) => {
  // Get User Cart
  const cart = await cartModel.findById(req.params.id);

  // console.log(cart);

  // Get Total Price
  const totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  // Create Order
  const order = new orderModel({
    user: req.user._id,
    cartItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });
  await order.save();

  if (order) {
    // Increment Sold & Decrement Quantity
    let options = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
      },
    }));
    await productModel.bulkWrite(options);

    // Clear User Cart
    await cartModel.findByIdAndDelete(req.params.id);

    return res.status(201).json({ message: "Success", order });
  }
});

// Get Specific Order
const getSpecificOrder = catchError(async (req, res, next) => {
  let order = await orderModel
    .findOne({ user: req.user._id })
    .populate("cartItems.product");
  res.status(200).json({ message: "Success", order });
});

// Get All Orders
const getAllOrders = catchError(async (req, res, next) => {
  let orders = await orderModel.find().populate("cartItems.product");
  res.status(200).json({ message: "Success", orders });
});

export { createCashOrder, getSpecificOrder, getAllOrders };
