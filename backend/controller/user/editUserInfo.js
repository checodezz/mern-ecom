const userModel = require("../../models/userModel");

async function editUserInfoController(req, res) {
  try {
    const sessionUser = req.userId;
    const {
      userId,
      name,
      email,
      mobileNumber,
      altMobileNumber,
      gender,
      birthday,
      pincode,
      state,
      address,
      town,
      district,
      typeOfAddress,
    } = req.body;

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(mobileNumber && { mobileNumber: mobileNumber }),
      ...(altMobileNumber && { altMobileNumber: altMobileNumber }),
      ...(gender && { gender: gender }),
      ...(birthday && { birthday: birthday }),
      ...(pincode && { pincode: pincode }),
      ...(state && { state: state }),
      ...(town && { town: town }),
      ...(address && { address: address }),
      ...(district && { district: district }),
      ...(typeOfAddress && { typeOfAddress: typeOfAddress }),
    };

    const user = await userModel.findById(sessionUser);
    // console.log("user role", user.role);

    const updateUser = await userModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });

    if (updateUser) {
      res.json({
        message: "User profile updated.",
        success: true,
        error: false,
        data: updateUser,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = editUserInfoController;
