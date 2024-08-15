const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

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

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found.", error: true });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(401)
        .json({ message: "Incorrect password.", error: true });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "8h",
      }
    );

    res
      .cookie("token", token, { httpOnly: true, secure: true })
      .json({ message: "Login successful!", token, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
}

module.exports = userSignInController;
