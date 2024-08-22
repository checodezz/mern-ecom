const categoryModel = require("../../models/categoryModel")

const getCategoriesController = async(req, res) => {
    try{
        const allCategories = await categoryModel.find();
        res.json({
            message: "All categories",
            success: true,
            error: false,
            data: allCategories
        })
    }catch(error){
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

module.exports = getCategoriesController