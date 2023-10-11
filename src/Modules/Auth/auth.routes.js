import express from "express";
import * as auth from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup",auth.signUp);
authRouter.post("/signin",auth.signIn);

// authRouter
//   .route("/:id")
//   .put(auth.updateBrand)
//   .delete(auth.deleteBrand)
//   .get(auth.getOneBrand);

export default authRouter;
