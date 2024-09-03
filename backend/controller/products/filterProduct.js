const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
  try {
    const { category, subCategory, q } = req?.query || req?.body;

    const filter = {};

    // Apply filters
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;

    // Handle search query with regex
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { subCategory: { $regex: q, $options: "i" } },
      ];
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
