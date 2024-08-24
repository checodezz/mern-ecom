const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    label: {
        type: String, 
        required: true
    }, 
    value: {
        type: String, 
        required: true
    }
})

const categorySchema = new mongoose.Schema({
    label: {
        type: String, 
        required: true
    }, 
    value: {
        type: String, 
        required: true
    }, 
    subCategories: [subCategorySchema]
})

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel