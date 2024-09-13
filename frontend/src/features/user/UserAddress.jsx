import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddEditUserAddressForm from "./AddEditUserAddressForm"; // Import the form component
import {
  deleteUserAddress,
  fetchUserAddresses,
  setCheckoutAddress,
  userResetState,
} from "./userSlice";
import { RxCross1 } from "react-icons/rx";

const UserAddress = () => {
  const dispatch = useDispatch();
  const {
    user,
    isSuccess,
    isError,
    message,
    addresses,
    defaultAddress,
    otherAddresses,
  } = useSelector((state) => state.user);

  // console.log(addresses);

  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to determine if we're adding or editing

  // console.log(selectedAddress);

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
    dispatch(userResetState());
  }, [message, isSuccess, isError, dispatch]);

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setIsEditing(true);
  };

  const handleAddAddress = () => {
    setSelectedAddress(null);
    setIsEditing(false);
  };

  const handleDeleteAddress = async (addressId) => {
    // console.log(addressId);
    await dispatch(deleteUserAddress(addressId)).then(() => {
      window.location.reload();
    });
  };

  const handleProceedToCheckout = (address) => {
    if (address) {
      dispatch(setCheckoutAddress(address));
      navigate("/cart");
    } else {
      toast.error("Please select an address before proceeding.");
    }
  };

  useEffect(() => {
    dispatch(fetchUserAddresses());
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");

    if (!hasRefreshed) {
      // Set flag in sessionStorage to avoid refreshing again
      sessionStorage.setItem("hasRefreshed", "true");

      window.location.reload();
    }
  }, [dispatch, defaultAddress]);

  return (
    <div className="container-fluid pe-5">
      <div className="bg-white p-4 me-5">
        <div className="border-bottom d-flex justify-content-between align-items-center">
          <h5 className="fw-bold">Saved Addresses</h5>
          <button
            className="btn btn-outline-dark text-uppercase mb-3"
            onClick={handleAddAddress}
            data-bs-toggle="modal"
            data-bs-target="#userAddressModal"
          >
            + Add New Address
          </button>
        </div>

        {addresses.length === 0 && (
          <div className="my4 me-4 pt-4">
            Please add an address before proceeding with payment.
          </div>
        )}

        {/* Default Address Section */}
        {defaultAddress && (
          <div className="my-4 me-5">
            <h6 className="fw-bold">Default Address</h6>
            <div className="card rounded-0 mb-4 position-relative">
              <div
                className="position-absolute btn "
                style={{ right: "10px", top: "5px" }}
                onClick={() => handleDeleteAddress(defaultAddress?._id)}
              >
                <RxCross1 size={20} />
              </div>
              <div className="card-body text-secondary">
                <h6 className="fw-bold text-dark text-capitalize">
                  {defaultAddress?.fullName}
                </h6>
                <p className="mb-0 small text-capitalize">
                  {defaultAddress?.address}
                </p>
                <p className="mb-0 small text-capitalize">
                  {defaultAddress?.town}
                </p>
                <p className="mb-0 small text-capitalize">
                  {defaultAddress?.district},{" "}
                  <span className="small text-capitalize">
                    {defaultAddress?.state}
                  </span>{" "}
                  -{defaultAddress?.pincode}
                </p>

                <p className="small">
                  Mobile:{" "}
                  <span className="fw-bold text-dark">
                    {defaultAddress?.mobileNo}
                  </span>
                </p>

                <div className="d-flex">
                  {" "}
                  <button
                    type="button"
                    className="btn text-teal justify-content-center align-items-center rounded-0 text-start  fw-bold"
                    onClick={() => handleEditAddress(defaultAddress)}
                    data-bs-toggle="modal"
                    data-bs-target="#userAddressModal"
                  >
                    Edit
                  </button>
                  <div
                    className="border-start mx-1 "
                    style={{ height: "2rem" }}
                  ></div>
                  <Link
                    type="button"
                    className="btn w-100 text-start text-teal fw-bold"
                    onClick={() => handleProceedToCheckout(defaultAddress)}
                  >
                    Use this address
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Addresses Section */}
        {otherAddresses.length !== 0 && (
          <div className="my-4 me-5">
            <h6 className="fw-bold">Other Addresses</h6>
            {otherAddresses.map((address) => (
              <div
                key={address._id}
                className="card rounded-0 mb-4 position-relative"
              >
                <div
                  className="position-absolute btn"
                  style={{ right: "10px", top: "5px" }}
                  onClick={() => handleDeleteAddress(address._id)} // Pass `address._id` here, not `defaultAddress._id`
                >
                  <RxCross1 size={20} />
                </div>
                <div className="card-body text-secondary">
                  <h6 className="fw-bold text-dark text-capitalize">
                    {address.fullName}{" "}
                    {/* Use `address.fullName` instead of `defaultAddress.fullName` */}
                  </h6>
                  <p className="mb-0 small text-capitalize">
                    {address.address}
                  </p>
                  <p className="mb-0 small text-capitalize">{address.town}</p>
                  <p className="mb-0 small text-capitalize">
                    {address.district},{" "}
                    <span className="small text-capitalize">
                      {address.state}
                    </span>{" "}
                    -{address.pincode}
                  </p>
                  <p className="small">
                    Mobile:{" "}
                    <span className="fw-bold text-dark">
                      {address.mobileNo}
                    </span>
                  </p>

                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn text-teal justify-content-center align-items-center rounded-0 text-start  fw-bold"
                      onClick={() => handleEditAddress(address)} // Pass `address` here
                      data-bs-toggle="modal"
                      data-bs-target="#userAddressModal"
                    >
                      Edit
                    </button>
                    <div
                      className="border-start mx-1"
                      style={{ height: "2rem" }}
                    ></div>
                    <Link
                      type="button"
                      className="btn w-100 text-start text-teal fw-bold"
                      onClick={() => handleProceedToCheckout(address)}
                    >
                      Use this address
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Add/Edit Address */}
        <div
          className="modal fade"
          id="userAddressModal"
          tabIndex="-1"
          aria-labelledby="userAddressModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h6
                  className="modal-title text-secondary fw-bold text-uppercase"
                  id="userAddressModalLabel"
                >
                  {isEditing ? "Edit Address" : "Add Address"}
                </h6>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <AddEditUserAddressForm
                  address={selectedAddress}
                  isEditing={isEditing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
