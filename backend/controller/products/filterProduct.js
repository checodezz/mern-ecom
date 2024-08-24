const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    const products = await productModel.find(filter);
    res.status(200).json({
      data: products,
      success: true,
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
