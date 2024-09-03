import ProductCard from "../../components/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const ProductList = ({ filteredProducts, isLoading }) => {
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
        className="row g-4 mt-1 overflow-y-scroll scrollbar-none"
        style={{ height: "calc(100vh - (-100px))" }}
      >
        {filteredProducts &&
          filteredProducts?.map((product) => {
            return (
              <div
                className=" col-lg-4 col-md-6 "
                key={product?._id}
                // style={{ minHeight: "calc(100vh - 284px)" }}
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
