const cartModel = require("../../models/cartModel");

const deleteCartItemController = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const cartItemId = req.body.cartItemId;

    const deleteCartItem = await cartModel.findByIdAndDelete(cartItemId);

    res.json({
      message: "Product deleted successfully.",
      data: deleteCartItem,
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = deleteCartItemController;
