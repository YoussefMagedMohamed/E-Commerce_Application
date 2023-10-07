import { globalError } from "./Middleware/globalErrorMiddleware.js";
import { AppError } from "./Utils/AppError.js";
import categoryRouter from "./Modules/Category/category.routes.js";
import subCategoryRouter from "./Modules/SubCategory/subCategory.routes.js";

export const bootstrap = (app) => {
  // Category route
  app.use("/api/v1/categories", categoryRouter);

  // SubCategory route
  app.use("/api/v1/subCategories", subCategoryRouter);

  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("*", (req, res, next) => {
    next(new AppError("End Point Not Found", 404));
  });

  app.use(globalError);
};
