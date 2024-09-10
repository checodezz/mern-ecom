import { Link } from "react-router-dom";
import { calculateDiscount, displayINRCurrency } from "../../utils/helpers";
import ReactStars from "react-rating-stars-component";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductCardLoader from "../../components/ProductCardLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  cartResetState,
  getCartItems,
  getCountCartItems,
} from "../cart/cartSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addProductToWishlist,
  getCountWishlistProducts,
  getWishlistProducts,
  removeFromWishlistProduct,
  setIsWishlisted,
  wishlistResetState,
} from "./wishlistSlice";
import { productResetState } from "../products/productSlice";
import { RxCross1 } from "react-icons/rx";

const WishlistProductCard = ({ product, isLoading }) => {
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
    dispatch(productResetState());
    dispatch(wishlistResetState());
  }, [message, isSuccess, isError, wMessage, wSuccess, wError, dispatch]);

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
  }, []);

  useEffect(() => {
    dispatch(cartResetState());
    dispatch(getWishlistProducts());
    dispatch(getCartItems());
    dispatch(wishlistResetState());
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
    console.log("wishlisted");
    dispatch(addProductToWishlist(productId)).then(() => {
      dispatch(setIsWishlisted(true));
      dispatch(getCountWishlistProducts());
    });
  };

  const handleRemoveFromWishList = (e, productId) => {
    console.log("removed from wishlist");
    e.stopPropagation();
    e.preventDefault();
    dispatch(removeFromWishlistProduct(productId)).then(() => {
      dispatch(setIsWishlisted(false));
      dispatch(getWishlistProducts());
    });
  };

  return (
    <>
      {isLoading ? (
        <ProductCardLoader />
      ) : (
        <div
          className="card w-100 position-relative"
          style={{
            minWidth: "100%",
            maxWidth: "15rem",
          }}
        >
          <div
            className="position-absolute btn"
            style={{ top: "5px", right: "10px" }}
            onClick={(e) => handleRemoveFromWishList(e, product?._id)}
          >
            <RxCross1 size={20} />
          </div>
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
                <button
                  type="button"
                  className="btn text-pink"
                  onClick={(e) => handleAddToWishList(e, product?._id)}
                >
                  <FaHeart size={25} />
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
          </Link>
        </div>
      )}
    </>
  );
};

export default WishlistProductCard;
