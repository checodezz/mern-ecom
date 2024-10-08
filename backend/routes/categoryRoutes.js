const express = require("express");
const getCategoriesController = require("../controller/categories/getCategories");
const addCategoryController = require("../controller/categories/addCategory");
const updateCategoryController = require("../controller/categories/updateCategory");
const authToken = require("../middleware/authToken");
const deleteCategoryController = require("../controller/categories/deleteCategory");
const getSubCategoriesWithProducts = require("../controller/categories/getSubCategoriesWithProducts");
const router = express.Router();

router.get("/get-categories", getCategoriesController);
router.post("/add-category", authToken, addCategoryController);
router.post("/update-category", authToken, updateCategoryController);
router.delete(
  "/delete-category/:categoryId",
  authToken,
  deleteCategoryController
);
router.get("/get-subcategories-products", getSubCategoriesWithProducts);

module.exports = router;
