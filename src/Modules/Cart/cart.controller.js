import { cartModel } from "../../../Database/Models/cart.model.js";
import { couponModel } from "../../../Database/Models/coupon.model.js";
import { productModel } from "../../../Database/Models/product.model.js";
import { AppError } from "../../Utils/AppError.js";
import { catchError } from "../../Utils/catchError.js";

// Calc Total Price of Products Function
function calcTotalPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((elm) => {
    totalPrice += elm.price * elm.quantity;
  });
  cart.totalPrice = totalPrice;
}

// Add To Cart
const addToCart = catchError(async (req, res, next) => {
  // Check if product is Exists
  let product = await productModel.findById(req.body.product).select("price");
  if (!product) {
    return next(new AppError("Product Not Found", 404));
  }

  // Calc Price of Product
  req.body.price = product.price;

  // Check if the user has already has a cart
  let isCart = await cartModel.findOne({ user: req.user._id });
  if (!isCart) {
    let cart = new cartModel({
      user: req.user._id,
      cartItems: [req.body],
    });

    // Calc Total Price of Products
    calcTotalPrice(cart);
    await cart.save();
    return res.status(201).json({ message: "Success", cart });
  } else {
    let item = isCart.cartItems.find((elm) => elm.product == req.body.product);
    if (item) {
      item.quantity += req.body.quantity || 1;
    } else {
      isCart.cartItems.push(req.body);
    }

    // Calc Total Price of Products
    calcTotalPrice(isCart);

    if (isCart.discount) {
      isCart.totalPriceAfterDiscount =
        isCart.totalPrice - (isCart.totalPrice * isCart.discount) / 100;
    }
    await isCart.save();
    res.status(201).json({ message: "add to cart", Cart: isCart });
  }
});

// Remove Product from Cart
const removeProductFromCart = catchError(async (req, res, next) => {
  let result = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    {
      new: true,
    }
  );
  calcTotalPrice(result);

  if (result.discount) {
    result.totalPriceAfterDiscount =
      result.totalPrice - (result.totalPrice * result.discount) / 100;
  }
  !result && next(new AppError("Item Not Found", 404));
  result && res.status(201).json({ message: "Success", Cart: result });
});

// Update Product Quantity
const updateQuantity = catchError(async (req, res, next) => {
  // Check Product Exists
  let product = await productModel.findById(req.params.id).select("price");
  if (!product) return next(new AppError("Product Not Found", 404));

  let isCart = await cartModel.findOne({ user: req.user._id });

  let item = isCart.cartItems.find((elm) => elm.product == req.params.id);
  if (item) {
    item.quantity = req.body.quantity;
  }
  calcTotalPrice(isCart);
  await isCart.save();
  res.status(201).json({ message: "Success", Cart: isCart });
});

// Apply Coupon To Cart
const applyCoupon = catchError(async (req, res, next) => {
  let coupon = await couponModel.findOne({
    code: req.body.code,
    // expires: { $gt: Date.now() },
  });
  console.log(coupon.discount);
  let cart = await cartModel.findOne({ user: req.user._id });
  cart.totalPriceAfterDiscount =
    cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
  cart.discount = coupon.discount;
  await cart.save();
  res.status(200).json({ message: "Success", cart });
});

// Get User Cart
const getLoggedUserCart = catchError(async (req, res, next) => {
  let cartItems = await cartModel
    .findOne({ user: req.user._id })
    .populate('cartItems.product');
  res.status(201).json({ message: "Success", Cart: cartItems });
});

export {
  addToCart,
  removeProductFromCart,
  applyCoupon,
  updateQuantity,
  getLoggedUserCart,
};
