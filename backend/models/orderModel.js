const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        productId: {
          _id: String,
          name: String,
          brandName: String,
          images: [String],
          sellingPrice: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
