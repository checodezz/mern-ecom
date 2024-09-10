import { Link } from "react-router-dom";
import { TbHeartFilled, TbHeartPlus } from "react-icons/tb";
import ReactStars from "react-rating-stars-component";
import { calculateDiscount, displayINRCurrency } from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  getCartItems,
  getCountCartItems,
  setIsProductInCart,
} from "../../cart/cartSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  addProductToWishlist,
  getCountWishlistProducts,
  getWishlistProducts,
  setIsWishlisted,
  wishlistResetState,
} from "../../wishlist/wishlistSlice";
import ProductInfoLoader from "./ProductInfoLoader";
import { productResetState } from "../productSlice";

const ProductInfo = ({ product, isLoading }) => {
  const dispatch = useDispatch();
  const { message, isSuccess, isError, cartItems, isProductInCart } =
    useSelector((state) => state.cart);
  const {
    message: wMessage,
    isSuccess: wSuccess,
    isError: wError,
    isWishlisted,
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

  useEffect(() => {
    dispatch(getWishlistProducts());
    dispatch(getCartItems());
    dispatch(wishlistResetState());
  }, [dispatch]);

  // Determine if the current product is in the wishlist
  useEffect(() => {
    if (product?._id && wishlistProducts?.length > 0) {
      const isProductInWishlist = wishlistProducts.some(
        (item) => item.productId?._id === product?._id
      );
      dispatch(setIsWishlisted(isProductInWishlist));

      const isInCart = cartItems.some(
        (item) => item.productId?._id === product?._id
      );
      dispatch(setIsProductInCart(isInCart));
    }
  }, [dispatch, product, wishlistProducts, cartItems]);

  const handleAddToWishList = (e, productId) => {
    e.preventDefault();
    dispatch(addProductToWishlist(productId)).then(() => {
      dispatch(setIsWishlisted(true));
      dispatch(getCountWishlistProducts());
    });
  };

  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    dispatch(addItemToCart(productId)).then(() => {
      dispatch(getCountCartItems());
    });
  };

  return (
    <>
      {isLoading ? (
        <ProductInfoLoader />
      ) : (
        <div>
          <div className="pe-5">
            <h2 className="card-title m-0">{product?.brandName}</h2>
            <h5 className="card-text text-grey">{product?.name}</h5>
            <p
              className="card-text border border-1 px-2 center-content"
              style={{ width: "80px", height: "30px" }}
            >
              <span className="me-1 fw-bold">{product?.rating}</span>
              <ReactStars
                count={1}
                size={20}
                value={product?.rating}
                activeColor="#ffd700"
                edit={false}
              />
            </p>
          </div>
          <hr />

          <div className="card-text d-flex justify-content-start align-items-center pe-5">
            <p className="fw-bold fs-4">
              {displayINRCurrency(product?.sellingPrice)}
            </p>
            <p
              className="card-text text-muted fw-light fs-5 mx-2"
              style={{ fontSize: "18px" }}
            >
              MRP ₹
              <span className="text-decoration-line-through">
                {product?.price}
              </span>{" "}
            </p>
            <p className="text-success fw-bold fs-5">
              ({calculateDiscount(product?.price, product?.sellingPrice)}% OFF)
            </p>
          </div>
          <p className="text-success fw-bold">Inclusive of all taxes</p>

          {/* add to wishlist and add to bag button */}
          <div className="d-grid gap-3 d-md-flex my-4 pe-5">
            {isWishlisted ? (
              <Link
                className="btn border border-1 center-content rounded-0"
                style={{ minWidth: "250px", height: "48px" }}
                onClick={(e) => handleAddToWishList(e, product?._id)}
              >
                <TbHeartFilled
                  className="text-pink"
                  style={{ fontSize: "24px" }}
                />{" "}
                <span className="mx-2 fw-semibold">Added to Wishlist</span>{" "}
              </Link>
            ) : (
              <Link
                className="btn border border-1 center-content rounded-0"
                style={{ minWidth: "250px", height: "48px" }}
                onClick={(e) => handleAddToWishList(e, product?._id)}
              >
                <TbHeartPlus style={{ fontSize: "24px" }} />{" "}
                <span className="mx-2 fw-semibold">Add to Wishlist</span>
              </Link>
            )}

            {isProductInCart ? (
              <Link
                className="btn btn-pink center-content rounded-0 fw-semibold w-100 "
                style={{ minWidth: "300px", height: "48px" }}
                to="/cart"
              >
                View Cart
              </Link>
            ) : (
              <Link
                className="btn btn-pink center-content rounded-0 fw-semibold w-100"
                style={{ minWidth: "300px", height: "48px" }}
                onClick={(e) => handleAddToCart(e, product?._id)}
              >
                Add to Cart
              </Link>
            )}
          </div>
          <hr />
        </div>
      )}
    </>
  );
};

export default ProductInfo;
