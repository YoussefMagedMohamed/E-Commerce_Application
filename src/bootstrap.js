import categoryRouter from "./Modules/Category/category.routes.js";

export const bootstrap = (app) => {
  // Category route
  app.use("/api/v1/categories", categoryRouter);

  app.get("/", (req, res) => res.send("Hello World!"));
};
