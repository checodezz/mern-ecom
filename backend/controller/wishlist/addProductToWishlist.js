const wishlistModel = require("../../models/wishlistModel");

const addProductToWishlistController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;

    // Check if the product is already in the cart for the current user
    const isProductInWishlist = await wishlistModel.findOne({
      productId: productId,
      userId: currentUser,
    });

    if (isProductInWishlist) {
      return res.json({
        message: "Product is already in your wishlist.",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      userId: currentUser,
    };

    const wishlistProduct = new wishlistModel(payload);

    const savedWishlistProduct = await wishlistProduct.save();

    return res.json({
      data: savedWishlistProduct,
      message: "Product added to your wishlist successfully!",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error.message ||
        "Failed to add product to wishlist. Please try again later.",
      error: true,
      success: false,
    });
  }
};

module.exports = addProductToWishlistController;
