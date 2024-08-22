const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    brandName: String,
    category: String,
    subCategory: String,
    images: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    rating: Number
  
}, {timestamps: true})

const productModel = mongoose.model("product", productSchema);

module.exports = productModel