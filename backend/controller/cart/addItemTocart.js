const cartModel = require("../../models/cartModel");

const addItemToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;

    // Check if the product is already in the cart for the current user
    const isProductInCart = await cartModel.findOne({
      productId: productId,
      userId: currentUser,
    });

    if (isProductInCart) {
      return res.json({
        message: "Product is already in the cart.",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newCartItem = new cartModel(payload);

    const savedCartItem = await newCartItem.save();

    return res.json({
      data: savedCartItem,
      message: "Product added to cart!",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Error adding product to cart.",
      error: true,
      success: false,
    });
  }
};

module.exports = addItemToCartController;
