const categoryModel = require("../../models/categoryModel");
const uploadProductPermission = require("../../helpers/permission");

async function deleteCategoryController(req, res) {
  try {

    const sessionUserId = req.userId;
    if(!uploadProductPermission(sessionUserId)){
        throw new Error("Permission denied.")
    }
    
    const deletedCategory = await categoryModel.findByIdAndDelete(req.params.categoryId);
      
    res.json({
      message: "Category deleted successfully.",
      data: deletedCategory,
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

module.exports = deleteCategoryController;
