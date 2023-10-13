import express from "express";
import * as wishlist from "./wishlist.controller.js";

const wishlistRouter = express.Router();

wishlistRouter.route("/").patch(wishlist.addToWishlist)


export default wishlistRouter;
