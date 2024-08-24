import ProductCard from "../../components/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFilteredProducts } from "./productSlice";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const { filteredProducts, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilteredProducts({ category }));
  }, [dispatch, category]);

  return (
    <div className="bg-light px-4 py-4 h-100 ">
      {" "}
      <p>
        <span className="fw-bold fs-5">Showing All Products</span>{" "}
        <span className="px-3">
          {filteredProducts &&
            `(Showing ${filteredProducts.length} ${
              filteredProducts.length === 1 ? "product" : "products"
            })`}{" "}
        </span>
      </p>
      {isLoading && <LoadingSpinner />}
      <div
        className="row g-4 mt-1 overflow-y-scroll"
        style={{ height: "calc(100vh - 90px)" }}
      >
        {filteredProducts &&
          filteredProducts?.map((product) => {
            return (
              <div
                className="col-xl-3 col-lg-4 col-md-6  "
                key={product?._id}
                style={{ height: "calc(60vh - 30px)" }}
              >
                <ProductCard product={product} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductList;
