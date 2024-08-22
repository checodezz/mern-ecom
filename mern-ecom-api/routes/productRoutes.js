const express = require("express");
const uploadProductController = require("../controller/products/uploadProduct");
const authToken = require("../middleware/authToken");
const getProductsController = require("../controller/products/getProducts");
const updateProductController = require("../controller/products/updateProduct");
const router = express.Router();

// authToken for to use this route only for admin
router.post("/upload-product", authToken, uploadProductController)

router.get("/get-products", getProductsController);
router.post("/update-product", authToken, updateProductController)

module.exports = router;
