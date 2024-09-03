import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFilteredProducts } from "../features/products/productSlice";
import { useLocation } from "react-router-dom";
import ProductFilterForm from "../features/products/ProductFilterForm";
import ProductList from "../features/products/ProductList";

const ProductsDisplayPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || "";
  const subCategory = searchParams.get("subCategory") || "";
  const q = searchParams.get("q") || "";

  const { filteredProducts, isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchFilteredProducts({ category, subCategory, q }));
  }, [dispatch, category, subCategory, q]);

  return (
    <div className="d-flex " style={{ minHeight: "calc(100vh - 90px)" }}>
      <aside
        className="bg-white flex-shrink-0 custom-shadow overflow-y-scroll scrollbar-none"
        style={{ width: "280px" }}
      >
        <ProductFilterForm filteredProducts={filteredProducts} />
      </aside>
      <main className="flex-grow-1 p-0 w-100 h-100">
        <ProductList
          filteredProducts={filteredProducts}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default ProductsDisplayPage;
