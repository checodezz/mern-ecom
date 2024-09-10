import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAddresses, setCheckoutAddress } from "../user/userSlice";
import { Link } from "react-router-dom";

const ChooseAddress = () => {
  const dispatch = useDispatch();
  const { checkoutAddress, defaultAddress } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserAddresses());
    dispatch(setCheckoutAddress(defaultAddress));
  }, [dispatch, defaultAddress]);

  return (
    <div className="card bg-white">
      <div className="card-body">
        <h5 className="card-title">
          <span className="small">Deliver to:</span>{" "}
          <span className="text-capitalize fw-bold ">
            {checkoutAddress?.fullName}, {checkoutAddress?.pincode}
          </span>
        </h5>
        <p className="text-capitalize">
          {checkoutAddress?.address}, {checkoutAddress?.town},{" "}
          {checkoutAddress?.district}
        </p>
      </div>
      <div className="card-footer">
        <Link
          className="btn text-teal fw-bold text-uppercase w-100"
          to="/my/address"
        >
          Change Address
        </Link>
      </div>
    </div>
  );
};

export default ChooseAddress;
