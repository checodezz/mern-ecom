const express = require("express");
const authToken = require("../middleware/authToken");
const addItemToCartController = require("../controller/cart/addItemTocart");
const countCartItems = require("../controller/cart/countCartItems");
const getCartItemsController = require("../controller/cart/getCartItems");
const updateCartItemController = require("../controller/cart/updateCartItem");
const deleteCartItemController = require("../controller/cart/deleteCartItem");
const router = express.Router();

// user add to cart
router.post("/cart/add-item", authToken, addItemToCartController);
router.get("/cart/count-items", authToken, countCartItems);
router.get("/cart/items", authToken, getCartItemsController);

router.post("/cart/update-item", authToken, updateCartItemController);
router.post("/cart/delete-item", authToken, deleteCartItemController);

module.exports = router;
