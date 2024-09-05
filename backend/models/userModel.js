const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    profilePic: String,
    role: String,
    mobileNumber: Number,
    altMobileNumber: Number,
    gender: String,
    birthday: String,
    pincode: Number,
    state: String,
    address: String,
    town: String,
    district: String,
    typeOfAddress: {
      type: String,
      default: "home",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
