const express = require("express");
const authToken = require("../middleware/authToken");
const addOrderController = require("../controller/orders/addOrder");
const getOrdersController = require("../controller/orders/getOrders");
const getOrderByIdController = require("../controller/orders/getOrderById");

const router = express.Router();

// authToken for to use this route only for admin
router.post("/order", authToken, addOrderController);

router.get("/orders", authToken, getOrdersController);

router.get("/orders/:orderId", authToken, getOrderByIdController);

module.exports = router;
