import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editUserProfile } from "./userSlice";
import { toast } from "react-toastify";

const EditProfile = () => {
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
          <h5 className="fw-bold">Edit Details</h5>
        </div>
        <form className="container my-4" onSubmit={submitHandler}>
          <div className="row mb-3 g-3">
            <div className="col-lg-6">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your full name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="row mb-3 g-3">
            <div className="col-lg-6">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="mobileNumber"
                placeholder="Enter your mobile number"
                value={formData.mobileNumber || ""}
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
                required
              />
            </div>
            <div className="col-lg-6">
              <label htmlFor="altMobileNumber" className="form-label">
                Alternate Mobile Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="altMobileNumber"
                placeholder="Enter your alternate mobile number"
                value={formData.altMobileNumber || ""}
                onChange={(e) =>
                  setFormData({ ...formData, altMobileNumber: e.target.value })
                }
              />
            </div>
          </div>

          <div className="row mb-3 g-3">
            <div className="col-lg-6">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                value={formData.gender || ""}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-lg-6">
              <label htmlFor="birthday" className="form-label">
                Birthday
              </label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                placeholder="DD/MM/YYYY"
                pattern="\d{2}/\d{2}/\d{4}"
                value={formData.birthday || ""}
                onChange={(e) =>
                  setFormData({ ...formData, birthday: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-pink fw-semibold">
            Save Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
