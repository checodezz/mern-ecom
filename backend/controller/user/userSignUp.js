const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });
    // console.log(user);

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists.", error: true });
    }

    if (!name) {
      return res
        .status(400)
        .json({ message: "Please provide name", error: true });
    }
    if (!email) {
      return res
        .status(400)
        .json({ message: "Please provide email", error: true });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "Please provide password", error: true });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      return res
        .status(400)
        .json({ message: "Something went wrong.", error: true });
    }

    const payload = {
      ...req.body,
      role: "GeneralUser",
      password: hashPassword,
    };

    const userData = new userModel(payload);

    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      message: "User created successfully!",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = userSignUpController;
