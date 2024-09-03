const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogoutController = require("../controller/user/userLogout");
const getWishlistProductsController = require("../controller/wishlist/getWishlistProducts");
const addProductToWishlistController = require("../controller/wishlist/addProductToWishlist");
const countWishlistProducts = require("../controller/wishlist/countWishlistProducts");
const deleteWishlistProductController = require("../controller/wishlist/deleteWishlistProduct");

router.post("/signUp", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/logout", userLogoutController);

// get wishlist products
router.get("/get/wishlist", authToken, getWishlistProductsController);
router.post("/wishlist/add-product", authToken, addProductToWishlistController);
router.get("/wishlist/count-items", authToken, countWishlistProducts);
router.post(
  "/wishlist/delete-product",
  authToken,
  deleteWishlistProductController
);

module.exports = router;
