import { Link } from "react-router-dom";
import { calculateDiscount, displayINRCurrency } from "../utils/helpers";
import ReactStars from "react-rating-stars-component";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductCardLoader from "./ProductCardLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  cartResetState,
  getCountCartItems,
} from "../features/cart/cartSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product, isLoading }) => {
  const dispatch = useDispatch();

  const { message, isSuccess, isError } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        toastId: "success",
      });
    } else if (isError) {
      toast.error(message, {
        toastId: "error",
      });
    }
  }, [message, isSuccess, isError]);

  useEffect(() => {
    dispatch(cartResetState());
  }, [dispatch, isSuccess, isError]);

  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addItemToCart(productId)).then(() => {
      dispatch(getCountCartItems());
    });
  };
  return (
    <>
      {isLoading ? (
        <ProductCardLoader />
      ) : (
        <div
          className="card w-100"
          style={{
            minWidth: "100%",
            maxWidth: "15rem",
          }}
        >
          <Link
            className="text-decoration-none text-black"
            to={`/products/details/${product._id}`}
          >
            <div
              className="image-container mx-auto mt-3"
              style={{
                width: "13rem",
                height: "12rem",
              }}
            >
              <img
                className="img-fluid product-image"
                src={product?.images[0]}
                alt={product?.name}
                style={{
                  objectFit: "contain",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />
            </div>

            <div className="card-body pb-0">
              <div className="d-flex justify-content-between">
                <div>
                  <h6
                    className="card-title text-truncate"
                    style={{ maxWidth: "12rem" }}
                  >
                    {product?.name}
                  </h6>
                </div>
              </div>

              {/* Price */}
              <div
                className="d-flex justify-content-start align-items-center"
                style={{ fontSize: "15px" }}
              >
                <p className="fw-semibold me-1 mb-0">
                  {displayINRCurrency(product?.sellingPrice)}
                </p>
                <p className="text-decoration-line-through text-secondary me-2 mb-0">
                  {displayINRCurrency(product?.price)}
                </p>

                <p className="text-success bg-lightgreen fw-semibold px-1 mb-0">
                  {calculateDiscount(product?.price, product?.sellingPrice)}%
                  off
                </p>
              </div>

              {/* Rating */}
              <div className="d-flex justify-content-start align-items-center">
                <span className="me-1">{product?.rating}</span>
                <ReactStars
                  count={1}
                  value={product?.rating}
                  size={25}
                  activeColor="#ffd700"
                  edit={false}
                />
              </div>
            </div>

            <div
              className="row"
              style={{
                marginLeft: "0.4px",
                marginRight: "0.4px",
                height: "45px",
              }}
            >
              <div className="col-3 center-content border-top">
                <Link type="button">
                  {product?.price > 0 ? (
                    <div className="text-dark">
                      <FaRegHeart size={25} />
                    </div>
                  ) : (
                    <div className="text-pink">
                      <FaHeart size={25} />
                    </div>
                  )}
                </Link>
              </div>
              <div
                className="col-9 center-content bg-pink"
                style={{ borderRadius: "0 0 5px 0" }}
              >
                <Link
                  type="button"
                  className="btn text-light text-decoration-none fw-semibold"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </Link>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductCard;
