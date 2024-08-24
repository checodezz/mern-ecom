const productModel = require("../../models/productModel");

const getCategoryNameWithProducts = async (req, res) => {
  try {
    const categoryWithProducts = await productModel.distinct("subCategory");

    const productByCategory = [];
    for (const subCategory of categoryWithProducts) {
      const product = await productModel.findOne({ subCategory });

      if (product) {
        productByCategory.push(product);
      }
    }

    console.log(productByCategory);

    res.status(200).json({
      message: "Category Product",
      data: productByCategory,
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

module.exports = getCategoryNameWithProducts;
