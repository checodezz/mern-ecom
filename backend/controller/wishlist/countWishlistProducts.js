const wishlistModel = require("../../models/wishlistModel");

const countWishlistProducts = async (req, res) => {
  try {
    const userId = req.userId;
    const countItems = await wishlistModel.countDocuments({ userId: userId });

    res.json({
      data: {
        count: countItems,
      },
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

module.exports = countWishlistProducts;
