import React from "react";
import { displayINRCurrency } from "../../utils/helpers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotalDiscount,
  calculateTotalMRP,
  calculateTotalPrice,
  calculateTotalQuantity,
} from "./cartSlice";
import CartSummaryLoader from "./CartSummaryLoader";

const CartSummary = ({ cartItems, isLoading }) => {
  const dispatch = useDispatch();
  const { totalQuantity, totalPrice, totalMRP, totalDiscount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(calculateTotalQuantity());
    dispatch(calculateTotalPrice());
    dispatch(calculateTotalDiscount());
    dispatch(calculateTotalMRP());
  }, [dispatch, cartItems]);
  return (
    <div>
      {isLoading ? (
        <CartSummaryLoader />
      ) : (
        <div className="card h-100 bg-white" style={{ height: "10rem" }}>
          <div className="card-body">
            <h5 className="card-title fw-bold">Order Summary</h5>
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Total Items </p>
                <p className="mb-0">{cartItems?.length}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Total Quantity </p>
                <p className="mb-0">{totalQuantity}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Total MRP </p>
                <p className="mb-0">{displayINRCurrency(totalMRP)}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Discount on MRP </p>
                <p className="mb-0">{displayINRCurrency(totalDiscount)}</p>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0 fs-5 fw-bold">Order Total:</p>
              <p className="mb-0 fs-5 fw-bold">
                {displayINRCurrency(totalPrice)}
              </p>
            </div>
            <hr className="mx-4" />
          </div>
          <div className="card-footer">
            <button className="btn text-teal fw-bold">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
