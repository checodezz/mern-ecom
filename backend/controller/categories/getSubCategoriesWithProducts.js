const productModel = require("../../models/productModel");

const getSubCategoriesWithProducts = async (req, res) => {
  try {
    const categoryWithProducts = await productModel.distinct("subCategory");

    const productBySubCategory = [];
    for (const subCategory of categoryWithProducts) {
      const product = await productModel.findOne({ subCategory });

      if (product) {
        productBySubCategory.push(product);
      }
    }

    // console.log(productBySubCategory);

    res.status(200).json({
      message: "SubCategory Products",
      data: productBySubCategory,
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

module.exports = getSubCategoriesWithProducts;
