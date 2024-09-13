import { Link } from "react-router-dom";
import { calculateDiscount, displayINRCurrency } from "../utils/helpers";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductCardLoader from "./ProductCardLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  cartResetState,
  getCartItems,
  getCountCartItems,
} from "../features/cart/cartSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addProductToWishlist,
  getCountWishlistProducts,
  getWishlistProducts,
  wishlistResetState,
} from "../features/wishlist/wishlistSlice";
import { FaStar } from "react-icons/fa6";

const ProductCard = ({ product, isLoading }) => {
  const dispatch = useDispatch();

  const { message, isSuccess, isError, cartItems } = useSelector(
    (state) => state.cart
  );
  const {
    message: wMessage,
    isSuccess: wSuccess,
    isError: wError,
    wishlistProducts,
  } = useSelector((state) => state.wishlist);
  const [localIsWishlisted, setLocalIsWishlisted] = useState(false);
  const [localIsInCart, setLocalIsInCart] = useState(false);

  useEffect(() => {
    if (product?._id) {
      // Check if the product is in the wishlist
      const isProductInWishlist = wishlistProducts?.some(
        (item) => item.productId?._id === product?._id
      );
      setLocalIsWishlisted(isProductInWishlist);

      // Check if the product is in the cart
      const isInCart = cartItems?.some(
        (item) => item.productId?._id === product?._id
      );
      setLocalIsInCart(isInCart);
    }
  }, [product?._id, wishlistProducts, cartItems]);

  useEffect(() => {
    if (isSuccess || wSuccess) {
      toast.success(message || wMessage, {
        toastId: "success",
      });
    } else if (isError || wError) {
      toast.error(message || wMessage, {
        toastId: "error",
      });
    }
    dispatch(cartResetState());
    dispatch(wishlistResetState());
  }, [message, isSuccess, isError, wMessage, wSuccess, wError, dispatch]);

  useEffect(() => {
    dispatch(cartResetState());
    dispatch(wishlistResetState());
    dispatch(getWishlistProducts());
    dispatch(getCartItems());
  }, [dispatch, isSuccess, isError]);

  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addItemToCart(productId)).then(() => {
      setLocalIsInCart(true);
      dispatch(getCountCartItems());
    });
  };

  const handleAddToWishList = (e, productId) => {
    e.preventDefault();
    dispatch(addProductToWishlist(productId)).then(() => {
      dispatch(setLocalIsWishlisted(true));
      dispatch(getCountWishlistProducts());
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
          </Link>

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
                {calculateDiscount(product?.price, product?.sellingPrice)}% off
              </p>
            </div>

            {/* Rating */}
            <div className="d-flex justify-content-start align-items-center">
              <span className="me-1">{product?.rating}</span>

              <div className="mb-0 pb-0" style={{ color: "#ffd700" }}>
                <FaStar />
              </div>
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
              <button
                type="button"
                className={`btn ${
                  localIsWishlisted ? "text-pink" : "text-dark"
                } w-100`}
                onClick={(e) => handleAddToWishList(e, product?._id)}
              >
                {localIsWishlisted ? (
                  <FaHeart size={25} />
                ) : (
                  <FaRegHeart size={25} />
                )}
              </button>
            </div>
            <div
              className="col-9 center-content bg-pink"
              style={{ borderRadius: "0 0 5px 0" }}
            >
              {localIsInCart ? (
                <Link
                  className="btn  text-light text-decoration-none fw-semibold"
                  to="/cart"
                >
                  View Cart
                </Link>
              ) : (
                <Link
                  type="button"
                  className="btn text-light text-decoration-none fw-semibold"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
