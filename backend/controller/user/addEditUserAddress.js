const Address = require("../../models/addressModel");

async function addEditUserAddressController(req, res) {
  try {
    const sessionUser = req.userId;
    const {
      fullName,
      mobileNo,
      pincode,
      state,
      address,
      town,
      district,
      typeOfAddress,
      addressId,
      isDefault,
    } = req.body;

    if (isDefault) {
      await Address.updateMany(
        { userId: sessionUser, isDefault: true },
        { isDefault: false }
      );
    }

    const addressPayload = {
      fullName,
      mobileNo,
      pincode,
      state,
      address,
      town,
      district,
      typeOfAddress,
      isDefault,
    };

    const updatedAddress = addressId
      ? await Address.findByIdAndUpdate(addressId, addressPayload, {
          new: true,
        })
      : await new Address({ userId: sessionUser, ...addressPayload }).save();

    res.json({
      message: addressId ? "Address updated." : "Address added.",
      success: true,
      error: false,
      data: updatedAddress,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = addEditUserAddressController;
