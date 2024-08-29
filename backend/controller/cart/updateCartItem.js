const cartModel = require("../../models/cartModel");

const updateCartItemController = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const cartItemId = req.body.cartItemId;
    const qty = req.body.quantity;

    const updateCartItem = await cartModel.findByIdAndUpdate(
      cartItemId,
      {
        quantity: qty,
      },
      { new: true }
    );

    res.json({
      message: "Product updated",
      data: updateCartItem,
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

module.exports = updateCartItemController;
