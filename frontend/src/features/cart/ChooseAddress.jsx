import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAddresses, setCheckoutAddress } from "../user/userSlice";
import { Link, useNavigate } from "react-router-dom";

const ChooseAddress = () => {
  const dispatch = useDispatch();
  const { checkoutAddress, defaultAddress, otherAddresses } = useSelector(
    (state) => state.user
  );

  // console.log(otherAddresses);

  useEffect(() => {
    dispatch(fetchUserAddresses());
    if (defaultAddress) {
      dispatch(setCheckoutAddress(defaultAddress));
    } else if (otherAddresses) {
      dispatch(setCheckoutAddress(otherAddresses?.[0]));
    }
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");

    if (!hasRefreshed) {
      // Set flag in sessionStorage to avoid refreshing again
      sessionStorage.setItem("hasRefreshed", "true");

      window.location.reload();
    }
  }, [dispatch, defaultAddress]);

  return (
    <div className="card bg-white">
      <div className="card-body">
        {defaultAddress === null || otherAddresses === null ? (
          <div>
            <h5 className="card-title fw-bold">
              No delivery address available
            </h5>
            <p className="mb-0">
              Please add a new address to proceed with the checkout.
            </p>
          </div>
        ) : (
          <div>
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
        )}
      </div>
      <div className="card-footer">
        <Link
          className="btn text-teal fw-bold text-uppercase w-100"
          to="/my/address"
        >
          {defaultAddress === null ? "Add Address" : "Change Address"}
        </Link>
      </div>
    </div>
  );
};

export default ChooseAddress;
