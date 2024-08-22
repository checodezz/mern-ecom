const categoryModel = require("../../models/categoryModel");
const uploadProductPermission = require("../../helpers/permission");

async function updateCategoryController(req, res) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied.");
    }

    const { _id, label, value, subCategories } = req.body;

    // Check if the category exists
    const existingCategory = await categoryModel.findById(_id);
    if (!existingCategory) {
      return res.status(404).json({
        message: "Category not found.",
        success: false,
        error: true,
      });
    }

    // Update the category fields
    existingCategory.label = label || existingCategory.label;
    existingCategory.value = value || existingCategory.value;

    // If subCategories are provided, update them
    if (subCategories) {
      existingCategory.subCategories = subCategories;
    }

    // Save the updated category
    const updatedCategory = await existingCategory.save();

    res.json({
      message: "Category updated successfully.",
      data: updatedCategory,
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
}

module.exports = updateCategoryController;
