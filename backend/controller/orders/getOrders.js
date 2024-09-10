const orderModel = require("../../models/orderModel");

const getOrdersController = async (req, res) => {
  try {
    const allOrders = await orderModel.find().sort({ createdAt: -1 });
    const totalOrders = await orderModel.countDocuments();

    res.json({
      message: "All orders",
      success: true,
      error: false,
      data: { allOrders, totalOrders },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getOrdersController;
