const addressModel = require("../../models/addressModel");

const getUserAddressesController = async (req, res) => {
  try {
    const userId = req.userId;

    const addresses = await addressModel.find({ userId: userId });

    if (addresses.length === 0) {
      return res.status(404).json({ message: "Add new address" });
    }

    res.json({
      data: addresses,
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

module.exports = getUserAddressesController;
