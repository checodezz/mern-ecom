const categoryModel = require("../../models/categoryModel")
const uploadProductPermission = require("../../helpers/permission");

const addCategoryController = async(req, res) => {
    try{
        const sessionUserId = req.userId;

    if(!uploadProductPermission(sessionUserId)){
        throw new Error("Permission denied")
    }

        const addCategory = new categoryModel(req.body);
        const saveCategory = await addCategory.save();
        res.status(200).json({
            message: "Category added successfully.",
            error: false,
            success: true,
            data: saveCategory
        })
    }catch(error){
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

module.exports = addCategoryController