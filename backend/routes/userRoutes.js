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
const editUserInfoController = require("../controller/user/editUserInfo");
const deleteUserController = require("../controller/user/deleteUser");
const addEditUserAddressController = require("../controller/user/addEditUserAddress");
const getUserAddressesController = require("../controller/user/getUserAddresses");
const deleteUserAddressController = require("../controller/user/deleteUserAddress");

router.post("/signUp", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/logout", userLogoutController);

// update user profile
router.post("/edit/user-profile", authToken, editUserInfoController);

// add or update user addresses
router.post("/user/address", authToken, addEditUserAddressController);
router.get("/user/addresses", authToken, getUserAddressesController);
router.post("/delete/user/address", authToken, deleteUserAddressController);

// delete user account
router.post("/delete/user-account", authToken, deleteUserController);

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
