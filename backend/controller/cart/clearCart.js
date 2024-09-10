// cartController.js

const cartModel = require("../../models/cartModel");

const clearCartController = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you get user ID from the request (JWT or session)
    await cartModel.deleteMany({ userId });
    // console.log(cartModel);

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error clearing cart",
    });
  }
};

module.exports = clearCartController;
