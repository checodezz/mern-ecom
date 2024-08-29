import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { calculateDiscount, displayINRCurrency } from "../../utils/helpers";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { deleteCartItem, getCartItems, updateCartItem } from "./cartSlice";
import CartItemsLoader from "./CartItemsLoader";

const CartItems = ({ cartItems, isLoading }) => {
  const loadingCart = new Array(4).fill(null);
  const dispatch = useDispatch();
  const { totalPrice } = useSelector((state) => state.cart);

  const increaseQtyHandler = (cartItemId, qty) => {
    const updateQuantity = qty + 1;
    dispatch(updateCartItem({ cartItemId, quantity: updateQuantity })).then(
      () => {
        dispatch(getCartItems());
      }
    );
  };

  const decreaseQtyHandler = (cartItemId, qty) => {
    const updateQuantity = qty > 1 ? qty - 1 : 1; // Prevent negative quantity
    if (qty > 1) {
      dispatch(updateCartItem({ cartItemId, quantity: updateQuantity })).then(
        () => {
          dispatch(getCartItems());
        }
      );
    }
  };

  const calculatePrice = (sellingPrice, quantity) => {
    if (quantity > 1) {
      return displayINRCurrency(sellingPrice * quantity);
    }
    return null;
  };

  return (
    <div>
      {isLoading ? (
        <CartItemsLoader />
      ) : (
        <div className="bg-white p-3">
          <h2>
            Shopping Cart{" "}
            <span className="small text-teal">({cartItems?.length} items)</span>
          </h2>
          <hr className="mb-0" />
          <ul className="list-group list-group-flush">
            {cartItems?.map((cartItem) => {
              const product = cartItem?.productId;
              return (
                <li
                  className="list-group-item d-flex position-relative"
                  key={cartItem._id}
                >
                  {/* delete button and save for latter button cart item */}

                  <div
                    className="position-absolute btn btn-outline-danger border-0 top-1 end-0 cursor-pointer"
                    onClick={() => dispatch(deleteCartItem(cartItem?._id))}
                  >
                    <RxCross1 size={24} />
                  </div>

                  <div className="row g-4 mb-0 ms-5 pt-3">
                    <div
                      className="col-md-4 d-flex justify-content-center align-items-center"
                      style={{ width: "8rem", height: "8rem" }}
                    >
                      <Link to={`/products/${product._id}`}>
                        <div
                          className="image-container m-4"
                          style={{
                            width: "8rem",
                            height: "8rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            className="img-fluid product-image"
                            src={product?.images[0]}
                            alt={product?.name}
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                        </div>
                      </Link>
                    </div>

                    <div className="col-md-8 ">
                      <div className="ms-md-5" style={{ minWidth: "32rem" }}>
                        <h5
                          className="text-truncate p-name-25 w-lg-25 w-sm-25"
                          style={{ maxWidth: "32rem" }}
                        >
                          {product?.name}
                        </h5>

                        {/* price section */}
                        <div className=" d-flex justify-content-start align-items-center pe-5">
                          <p className="fw-bold fs-5">
                            {displayINRCurrency(product?.sellingPrice)}
                          </p>
                          <p className="text-decoration-line-through text-secondary mx-2 ">
                            {displayINRCurrency(product?.price)}
                          </p>
                          <p className="text-success bg-lightgreen fw-semibold px-1">
                            {calculateDiscount(
                              product?.price,
                              product?.sellingPrice
                            )}
                            % off
                          </p>
                        </div>

                        {/* actions for quantity and product */}
                        <div className="d-flex align-items-center">
                          <div
                            className="d-flex align-items-center me-3 gap-3 mt-1 bg-pink rounded"
                            style={{ width: "8rem" }}
                          >
                            <button
                              className="btn text-white "
                              onClick={() =>
                                decreaseQtyHandler(
                                  cartItem?._id,
                                  cartItem?.quantity
                                )
                              }
                            >
                              <FaMinus />
                            </button>
                            <span className="text-white fs-5">
                              {cartItem?.quantity}
                            </span>
                            <button
                              className="btn text-white"
                              onClick={() =>
                                increaseQtyHandler(
                                  cartItem?._id,
                                  cartItem?.quantity
                                )
                              }
                            >
                              <FaPlus />
                            </button>
                          </div>
                          {cartItem?.quantity > 1 && (
                            <div
                              className="border-start mx-1 "
                              style={{ height: "2rem" }}
                            ></div>
                          )}
                          <div className="ms-2 text-teal fw-bold">
                            {calculatePrice(
                              product?.sellingPrice,
                              cartItem?.quantity
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <hr className="mt-0 pt-0" />
          <div className="d-flex justify-content-end">
            <h5>
              Total ({cartItems.length} items):{" "}
              <span className="fw-bold">{displayINRCurrency(totalPrice)}</span>
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
