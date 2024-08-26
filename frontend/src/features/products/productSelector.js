import { createSelector } from "@reduxjs/toolkit";

// memoize subCategoryWiseProducts
export const selectSubCategoryWiseProducts = (state) =>
  state.products.subCategoryWiseProducts;

export const makeSelectProductsBySubCategory = () => {
  return createSelector(
    [selectSubCategoryWiseProducts, (state, subCategory) => subCategory],
    (subCategoryWiseProducts, subCategory) =>
      subCategoryWiseProducts[subCategory] || []
  );
};
