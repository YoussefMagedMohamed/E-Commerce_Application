import express from "express";
import * as wishlist from "./wishlist.controller.js";
import { allowedTo, protectedRoutes } from "../Auth/auth.controller.js";

const wishlistRouter = express.Router();

wishlistRouter.route("/").patch(protectedRoutes, allowedTo("user"),wishlist.addToWishlist)


export default wishlistRouter;
