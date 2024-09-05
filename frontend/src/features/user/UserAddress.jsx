import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editUserProfile } from "./userSlice";
import { toast } from "react-toastify";

const UserAddress = () => {
  const dispatch = useDispatch();
  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    altMobileNumber: "",
    gender: "",
    birthday: "",
    pincode: "",
    state: "",
    address: "",
    town: "",
    district: "",
    typeOfAddress: "",
  });

  useEffect(() => {
    if (user?._id) {
      setFormData({
        name: user?.name,
        email: user?.email,
        mobileNumber: user?.mobileNumber,
        altMobileNumber: user?.altMobileNumber,
        gender: user?.gender,
        birthday: user?.birthday,
        pincode: user?.pincode,
        state: user?.state,
        address: user?.address,
        town: user?.town,
        district: user?.district,
        typeOfAddress: user?.typeOfAddress,
      });
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    } else if (isError) {
      toast.error(message);
    }
  }, [message, isSuccess, isError]);

  const submitHandler = (e) => {
    e.preventDefault();
    const dataToUpdate = user?._id && { userId: user?._id, ...formData };
    if (dataToUpdate) {
      dispatch(editUserProfile(dataToUpdate));
    }
  };

  return (
    <div className="container-fluid pe-5 ">
      <div className="bg-white p-4 me-5">
        <div className="border-bottom">
          <h5 className="fw-bold">Saved Addresses</h5>
        </div>
        <div className="my-4 me-5" id="userAddress">
          <div className="card rounded-0">
            <div className="card-body text-secondary">
              <h6 className="fw-bold text-capitalize">{user?.name}</h6>
              <p className="mb-0 small text-capitalize">{user?.address}</p>
              <p className="mb-0 small text-capitalize">{user?.town}</p>
              <p className="mb-0 small text-capitalize">
                {user?.district} - {user?.pincode}
              </p>
              <p className=" small text-capitalize">{user?.state}</p>
              <p className="small">Mobile: {user?.mobileNumber}</p>
            </div>
            <div className="card-footer bg-white ">
              <button
                type="button"
                className="btn w-100 text-start text-teal fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#userAddressModal"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* user address modal  */}
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
                  Edit Address
                </h6>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={submitHandler}>
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="form-label text-secondary small"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="form-control fw-bold text-capitalize"
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="mobileNumber"
                      className="form-label text-secondary small"
                    >
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      className="form-control fw-bold "
                      id="mobileNumber"
                      placeholder="Enter your mobile number"
                      value={formData.mobileNumber || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mobileNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="row mb-3 g-3">
                    <div className="col-lg-6">
                      <label
                        htmlFor="pincode"
                        className="form-label  text-secondary small"
                      >
                        Pincode *
                      </label>
                      <input
                        type="number"
                        className="form-control fw-bold"
                        id="pincode"
                        pattern="\d{6}"
                        maxLength={6}
                        minLength={6}
                        value={formData.pincode || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, pincode: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <label
                        htmlFor="state"
                        className="form-label  text-secondary small"
                      >
                        State *
                      </label>
                      <input
                        type="text"
                        className="form-control fw-bold text-capitalize"
                        id="state"
                        value={formData.state || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="address"
                      className="form-label text-secondary small"
                    >
                      Address (House No, Building, Street, Area) *
                    </label>
                    <input
                      type="text"
                      className="form-control fw-bold text-capitalize"
                      id="address"
                      value={formData.address || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="row mb-3 g-3">
                    <div className="col-lg-6">
                      <label
                        htmlFor="town"
                        className="form-label  text-secondary small"
                      >
                        Locality/ Town *
                      </label>
                      <input
                        type="text"
                        className="form-control fw-bold text-capitalize"
                        id="town"
                        value={formData.town || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, town: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-lg-6">
                      <label
                        htmlFor="district"
                        className="form-label  text-secondary small"
                      >
                        City/ District *
                      </label>
                      <input
                        type="text"
                        className="form-control fw-bold text-capitalize"
                        id="district"
                        value={formData.district || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, district: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="typeOfAddress"
                      className="form-label text-secondary small"
                    >
                      Type of Address *
                    </label>
                    <br />
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="home"
                        name="typeOfAddress"
                        value="home"
                        checked={formData.typeOfAddress === "home"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            typeOfAddress: e.target.value,
                          })
                        }
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="home"
                      >
                        Home
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="office"
                        name="typeOfAddress"
                        value="office"
                        checked={formData.typeOfAddress === "office"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            typeOfAddress: e.target.value,
                          })
                        }
                      />
                      <label
                        className="form-check-label text-secondary"
                        htmlFor="office"
                      >
                        Office
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-pink w-25 position-absolute  "
                    style={{ bottom: "10px", right: "15px" }}
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
