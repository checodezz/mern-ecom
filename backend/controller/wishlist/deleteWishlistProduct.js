const cartModel = require("../../models/cartModel");
const wishlistModel = require("../../models/wishlistModel");

const deleteWishlistProductController = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const productId = req.body.productId;
    // console.log(productId);

    const deleteWishlistProduct = await wishlistModel.findOneAndDelete({
      userId: currentUserId,
      productId: productId,
    });

    res.json({
      message: "Product removed from wishlist.",
      data: deleteWishlistProduct,
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

module.exports = deleteWishlistProductController;
