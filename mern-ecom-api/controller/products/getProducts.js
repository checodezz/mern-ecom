const productModel = require("../../models/productModel")

const getProductsController = async(req, res) => {
    try{
        const allProducts = await productModel.find().sort({ createdAt: -1});
        res.json({
            message: "All products",
            success: true,
            error: false,
            data: allProducts
        })
    }catch(error){
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

module.exports = getProductsController