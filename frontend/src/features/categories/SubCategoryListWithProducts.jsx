import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSubCategoriesWithProduct } from "./categorySlice";
import { Link } from "react-router-dom";
import { fetchFilteredProducts } from "../products/productSlice";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const SubCategoryListWithProducts = () => {
  const dispatch = useDispatch();
  const { subCategoriesWithProducts, isLoading } = useSelector(
    (state) => state.categories
  );
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 150;
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 150;
    }
  };

  useEffect(() => {
    dispatch(fetchAllSubCategoriesWithProduct());
  }, [dispatch]);

  return (
    <div className="container-fluid bg-light my-4 mx-auto pt-5 pb-4 px-4 position-relative slider-products">
      <button
        className="btn btn-light ms-2 z-3 shadow rounded-circle position-absolute start-0 top-50 translate-middle-y left-arrow-icon"
        onClick={scrollLeft}
      >
        <FaAngleLeft />
      </button>
      <button
        className="btn btn-light me-2 z-3 shadow rounded-circle position-absolute end-0 top-50 translate-middle-y right-arrow-icon"
        onClick={scrollRight}
      >
        <FaAngleRight />
      </button>

      <div
        className="d-flex align-items-center justify-content-between overflow-x-scroll scrollbar-none"
        ref={sliderRef}
      >
        {isLoading
          ? Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center mx-2 mb-4"
                style={{ width: "5rem", height: "5rem" }}
              >
                <div
                  className="rounded-circle bg-secondary-subtle border"
                  style={{ width: "5rem", height: "5rem", padding: "0.75rem" }}
                >
                  <div
                    className="bg-lightgrey pulse-animation"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  ></div>
                </div>
                <div
                  className="mt-2 bg-lightgrey pulse-animation w-75"
                  style={{ height: "1rem", opacity: 0.5 }}
                ></div>
              </div>
            ))
          : subCategoriesWithProducts?.map((product) => (
              <Link
                key={product?._id}
                className="cursor-pointer text-decoration-none text-dark"
                to={`/products?subCategory=${product.subCategory}`}
                onClick={() =>
                  dispatch(fetchFilteredProducts(product.subCategory))
                }
              >
                <div
                  className="image-container rounded-circle overflow-hidden mx-2 bg-white border"
                  style={{ width: "5rem", height: "5rem", padding: "0.75rem" }}
                >
                  <img
                    src={product?.images[0]}
                    alt={product?.subCategory}
                    className="w-100  product-image"
                  />
                </div>
                <p className="text-center text-capitalize fw-semibold small">
                  {product?.subCategory}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default SubCategoryListWithProducts;
