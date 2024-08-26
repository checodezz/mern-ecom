const productModel = require("../../models/productModel");

const getSubCategoryWiseProducts = async (req, res) => {
  try {
    const { subCategory } = req?.body || req?.query;
    const product = await productModel.find({ subCategory });

    res.json({
      data: product,
      message: "Product",
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

module.exports = getSubCategoryWiseProducts;
