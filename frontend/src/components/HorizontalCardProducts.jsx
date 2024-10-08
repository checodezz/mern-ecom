import { useEffect, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { displayINRCurrency } from "../utils/helpers";
import {
  clearSubCategoryWiseProducts,
  fetchSubCategoryWiseProducts,
} from "../features/products/productSlice";
import { makeSelectProductsBySubCategory } from "../features/products/productSelector";
import HorizontalCardProductsLoader from "./HorizontalCardProductsLoader";
import { addItemToCart, getCountCartItems } from "../features/cart/cartSlice";

const HorizontalCardProducts = ({ subCategory, heading }) => {
  const dispatch = useDispatch();

  const selectProductsBySubCategory = makeSelectProductsBySubCategory();
  const subCategoryWiseProducts = useSelector((state) =>
    selectProductsBySubCategory(state, subCategory)
  );
  const isLoading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    dispatch(fetchSubCategoryWiseProducts({ subCategory }));
  }, [dispatch, subCategory]);

  useEffect(() => {
    return () => {
      dispatch(clearSubCategoryWiseProducts());
    };
  }, [dispatch, subCategory]);

  const scrollElement = useRef();

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 150;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 150;
  };

  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addItemToCart(productId)).then(() => {
      dispatch(getCountCartItems());
    });
  };

  return (
    <div className="container-fluid bg-light mx-auto p-4 my-4 position-relative slider-products ">
      <h2 className="fs-4 fw-semibold py-2">{heading}</h2>

      <button
        className="btn btn-light shadow z-3 rounded-circle position-absolute start-0  translate-middle-y left-arrow-icon"
        onClick={scrollLeft}
        style={{ position: "absolute", top: "60%" }}
      >
        <FaAngleLeft />
      </button>
      <button
        className="btn btn-light shadow z-3 rounded-circle position-absolute end-0  translate-middle-y right-arrow-icon"
        onClick={scrollRight}
        style={{ position: "absolute", top: "60%" }}
      >
        <FaAngleRight />
      </button>

      <div
        className="d-flex overflow-auto scrollbar-none"
        ref={scrollElement}
        style={{ scrollBehavior: "smooth" }}
      >
        {isLoading ? (
          <HorizontalCardProductsLoader />
        ) : (
          subCategoryWiseProducts?.slice(0, 7).map((product) => (
            <div
              className="card h-100 me-3 "
              key={product?._id}
              style={{ width: "300px", flexShrink: 0 }}
            >
              <Link
                className="text-decoration-none text-dark"
                to={`/products/details/${product._id}`}
              >
                <div className="row g-0 mb-0 pb-0">
                  <div className="col-md-5 bg-secondary-subtle d-flex justify-content-center align-items-center">
                    <img
                      src={product?.images[0]}
                      className="img-fluid rounded-start product-image"
                      alt={product?.name}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body">
                      <h5
                        className="card-title text-truncate"
                        style={{ minWidth: "10rem" }}
                      >
                        {product?.name}
                      </h5>
                      <p className="card-text mb-0 text-capitalize">
                        {product?.subCategory}
                      </p>
                      <div className="d-flex">
                        <p className="me-2 fw-semibold">
                          {displayINRCurrency(product?.sellingPrice)}
                        </p>
                        <p className="text-muted text-decoration-line-through">
                          {displayINRCurrency(product?.price)}
                        </p>
                      </div>
                      <button
                        className="btn btn-danger rounded-pill w-100 btn-sm"
                        onClick={(e) => handleAddToCart(e, product._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HorizontalCardProducts;
