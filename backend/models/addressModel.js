const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      ref: "user",
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: Number,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    typeOfAddress: {
      type: String,
      enum: ["home", "office"],
      default: "home",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const addressModel = mongoose.model("address", addressSchema);

module.exports = addressModel;
