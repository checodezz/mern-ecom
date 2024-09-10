const orderModel = require("../../models/orderModel");

const getOrderByIdController = async (req, res) => {
  try {
    const orderId = req.params?.orderId;

    const order = await orderModel.findById(orderId);

    res.json({
      message: "Order details",
      success: true,
      error: false,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getOrderByIdController;
