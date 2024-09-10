import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchFilteredProducts } from "../features/products/productSlice";
import { useLocation } from "react-router-dom";
import ProductFilterForm from "../features/products/ProductFilterForm";
import ProductList from "../features/products/ProductList";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(fetchFilteredProducts({ category, subCategory, q }));
  }, [dispatch, category, subCategory, q]);

  return (
    <div
      className="d-flex  d-grid justify-content-between align-items-start "
      style={{ minHeight: "100vh", position: "relative" }}
    >
      {/* Toggle button next to the Outlet content  */}
      <button
        className="btn btn-light d-md-none mt-3 mx-2"
        onClick={toggleSidebar}
        style={{
          left: isSidebarOpen ? "280px " : "20px",
          // height: isSidebarOpen ? "50px" : "50px",
          zIndex: 1000,
        }}
      >
        {isSidebarOpen ? (
          <div className="" style={{ background: "transparent" }}>
            <FaTimes size={20} />
          </div>
        ) : (
          <FaBars size={20} />
        )}
      </button>

      {/* sidebar */}
      <aside
        className={`bg-white flex-shrink-0 custom-shadow overflow-y-scroll scrollbar-none ${
          isSidebarOpen ? "d-block" : "d-none"
        } d-md-block`}
        style={{
          width: "280px",
          position: isSidebarOpen ? "absolute" : "static",
          top: "0",
          left: "0",
          height: "calc(100vh - (-194px))",
          zIndex: 999,
        }}
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
