const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    productId: {
      ref: "product",
      type: String,
    },
    userId: String,
  },
  { timestamps: true }
);

const wishlistModel = mongoose.model("wishlist", wishlistSchema);

module.exports = wishlistModel;
