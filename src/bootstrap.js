import { globalError } from "./Middleware/globalErrorMiddleware.js";
import { AppError } from "./Utils/AppError.js";
import categoryRouter from "./Modules/Category/category.routes.js";
import subCategoryRouter from "./Modules/SubCategory/subCategory.routes.js";
import brandRouter from "./Modules/Brand/brand.routes.js";
import productRouter from "./Modules/Product/product.routes.js";
import userRouter from "./Modules/User/user.routes.js";
import authRouter from "./Modules/Auth/auth.routes.js";
import reviewRouter from "./Modules/Review/review.routes.js";
import addressRouter from "./Modules/Address/address.routes.js";
import couponRouter from "./Modules/Coupon/coupon.routes.js";
import cartRouter from "./Modules/Cart/cart.routes.js";
import orderRouter from "./Modules/Order/order.routes.js";

export const bootstrap = (app) => {
  // Category route
  app.use("/api/v1/categories", categoryRouter);

  // SubCategory route
  app.use("/api/v1/subCategories", subCategoryRouter);

  // Brand route
  app.use("/api/v1/brands", brandRouter);

  // Product route
  app.use("/api/v1/products", productRouter);

  // User route
  app.use("/api/v1/users", userRouter);

  // Auth route
  app.use("/api/v1/auth", authRouter);

  // Review route
  app.use("/api/v1/reviews", reviewRouter);

  // Wishlist route
  // app.use("/api/v1/wishlist", wishlistRouter);

  // Address route
  app.use("/api/v1/addresses", addressRouter);

  // Coupon route
  app.use("/api/v1/coupons", couponRouter);

  // Cart route
  app.use("/api/v1/carts", cartRouter);

  // Order route
  app.use("/api/v1/orders", orderRouter);

  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("*", (req, res, next) => {
    next(new AppError("End Point Not Found", 404));
  });

  app.use(globalError);
};
