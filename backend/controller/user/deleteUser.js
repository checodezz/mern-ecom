const cartModel = require("../../models/cartModel");
const wishlistModel = require("../../models/wishlistModel");
const userModel = require("../../models/userModel");

const deleteUserController = async (req, res) => {
  try {
    const currentUserId = req.userId;
    // console.log(currentUserId);

    // Optionally delete related data, like user's cart
    await cartModel.deleteMany({ userId: currentUserId });

    // Delete the user's wishlist
    await wishlistModel.deleteMany({ userId: currentUserId });

    // Delete the user
    const deletedUser = await userModel.findByIdAndDelete(currentUserId);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "User account deleted successfully.",
      data: deletedUser,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = deleteUserController;
