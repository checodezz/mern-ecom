const wishlistModel = require("../../models/wishlistModel");

const getWishlistProductsController = async (req, res) => {
  try {
    const userId = req.userId;
    const wishlistProducts = await wishlistModel
      .find({
        userId: userId,
      })
      .populate("productId");

    // console.log(wishlistProducts);

    res.json({
      data: wishlistProducts,
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

module.exports = getWishlistProductsController;
