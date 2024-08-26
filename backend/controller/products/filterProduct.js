const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
  try {
    const { category, subCategory } = req?.query || req?.body;

    const filter = {};

    if (category) {
      filter.category = category;
    } else if (subCategory) {
      filter.subCategory = subCategory;
    }

    const products = await productModel.find(filter);

    res.status(200).json({
      data: products,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = filterProductController;
