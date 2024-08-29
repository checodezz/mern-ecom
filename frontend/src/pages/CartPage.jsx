import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../features/cart/cartSlice";
import CartItems from "../features/cart/CartItems";
import CartSummary from "../features/cart/CartSummary";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <div className="container-fluid px-4 py-4">
      {cartItems.length === 0 && isLoading && (
        <div className="text-center fs-5 my-3">
          <p className="bg-white py-4">Your cart is empty.</p>
        </div>
      )}

      <div className="row g-5">
        <div className="col-md-9">
          <CartItems cartItems={cartItems} isLoading={isLoading} />
        </div>
        <div className="col-md-3">
          <CartSummary cartItems={cartItems} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
