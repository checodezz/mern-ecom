const cartModel = require("../../models/cartModel");

const getCartItemsController = async (req, res) => {
  try {
    const userId = req.userId;
    const cartItems = await cartModel
      .find({
        userId: userId,
      })
      .populate("productId");

    res.json({
      data: cartItems,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = getCartItemsController;
