const addressModel = require("../../models/addressModel");

const deleteUserAddressController = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addressId = req.body.addressId;
    // console.log(addressId);

    const addressExists = await addressModel.findOne({
      _id: addressId,
      userId: currentUserId,
    });

    if (!addressExists) {
      return res.status(404).json({
        message: "Address not found or does not belong to the current user.",
        success: false,
        error: true,
      });
    }

    const deletedAddresses = await addressModel.findOneAndDelete({
      _id: addressId,
      userId: currentUserId,
    });

    // console.log("Deleted Addresses:", deletedAddresses); // Add this line for debugging

    res.json({
      message: "Address deleted successfully.",
      data: deletedAddresses,
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

module.exports = deleteUserAddressController;
