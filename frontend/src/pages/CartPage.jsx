import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../features/cart/cartSlice";
import CartItems from "../features/cart/CartItems";
import CartSummary from "../features/cart/CartSummary";
import ChooseAddress from "../features/cart/ChooseAddress";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <div className="container-fluid px-4 py-4">
      {cartItems?.length === 0 && (
        <div className="text-center fs-5 my-3 bg-white p-4">
          <p className="">Your cart is empty.</p>
          <p>
            Check your{" "}
            <Link to="/wishlist" className="text-decoration-none text-teal">
              wishlist
            </Link>{" "}
            or{" "}
            <Link to="/" className="text-decoration-none text-teal">
              continue shopping
            </Link>
            .
          </p>
        </div>
      )}

      {cartItems.length !== 0 && (
        <div className="row g-4">
          <div className="col-md-8">
            <CartItems cartItems={cartItems} isLoading={isLoading} />
          </div>
          <div className="col-md-4 ">
            <div className="d-flex flex-column gap-4">
              <ChooseAddress />
              <CartSummary cartItems={cartItems} isLoading={isLoading} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
