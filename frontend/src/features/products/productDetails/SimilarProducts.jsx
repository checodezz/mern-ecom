import React, { useEffect } from "react";
import { makeSelectProductsBySubCategory } from "../productSelector";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategoryWiseProducts } from "../productSlice";
import ProductCard from "../../../components/ProductCard";
import ProductCardLoader from "../../../components/ProductCardLoader";

const SimilarProducts = ({ subCategory }) => {
  const dispatch = useDispatch();
  const selectProductsBySubCategory = makeSelectProductsBySubCategory();

  const subCategoryWiseProducts = useSelector((state) =>
    selectProductsBySubCategory(state, subCategory)
  );

  const isLoading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    dispatch(fetchSubCategoryWiseProducts({ subCategory }));
  }, [dispatch, subCategory]);

  return (
    <div>
      <h6 className="fw-bold text-uppercase">Similar Products</h6>
      <div className="row g-4">
        {isLoading ? (
          <ProductCardLoader />
        ) : (
          subCategoryWiseProducts?.slice(0, 7).map((product) => (
            <div className="col-lg-3 col-md-4" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SimilarProducts;
