import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addEditUserAddress, fetchUserAddresses } from "./userSlice";

const AddEditUserAddressForm = ({ address, isEditing }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    pincode: "",
    state: "",
    address: "",
    town: "",
    district: "",
    typeOfAddress: "home",
    isDefault: false,
  });

  useEffect(() => {
    if (isEditing && address) {
      setFormData({
        fullName: address?.fullName || "",
        mobileNo: address?.mobileNo || "",
        pincode: address?.pincode || "",
        state: address?.state || "",
        address: address?.address || "",
        town: address?.town || "",
        district: address?.district || "",
        typeOfAddress: address?.typeOfAddress || "home",
        isDefault: address?.isDefault || false,
      });
    } else {
      setFormData({
        name: "",
        mobileNumber: "",
        pincode: "",
        state: "",
        address: "",
        town: "",
        district: "",
        typeOfAddress: "home",
        isDefault: false,
      });
    }
  }, [isEditing, address]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEditing && address?._id) {
      dispatch(
        addEditUserAddress({ addressId: address?._id, ...formData })
      ).then(() => {
        dispatch(fetchUserAddresses());
      });
    } else {
      dispatch(addEditUserAddress(formData)).then(() => {
        dispatch(fetchUserAddresses());
      });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label text-secondary small">
          Full Name *
        </label>
        <input
          type="text"
          className="form-control fw-bold text-capitalize"
          id="fullName"
          value={formData.fullName || ""}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mobileNo" className="form-label text-secondary small">
          Mobile Number *
        </label>
        <input
          type="tel"
          className="form-control fw-bold"
          id="mobileNo"
          value={formData.mobileNo || ""}
          onChange={(e) =>
            setFormData({ ...formData, mobileNo: e.target.value })
          }
          required
        />
      </div>

      <div className="row mb-3 g-3">
        <div className="col-lg-6">
          <label htmlFor="pincode" className="form-label text-secondary small">
            Pincode *
          </label>
          <input
            type="number"
            className="form-control fw-bold"
            id="pincode"
            value={formData.pincode || ""}
            onChange={(e) =>
              setFormData({ ...formData, pincode: e.target.value })
            }
            required
          />
        </div>
        <div className="col-lg-6">
          <label htmlFor="state" className="form-label text-secondary small">
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
        <label htmlFor="address" className="form-label text-secondary small">
          Address *
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
          <label htmlFor="town" className="form-label text-secondary small">
            Town *
          </label>
          <input
            type="text"
            className="form-control fw-bold text-capitalize"
            id="town"
            value={formData.town || ""}
            onChange={(e) => setFormData({ ...formData, town: e.target.value })}
            required
          />
        </div>

        <div className="col-lg-6">
          <label htmlFor="district" className="form-label text-secondary small">
            District *
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
        <label className="form-label text-secondary small">
          Address Type *
        </label>
        <div className="d-flex">
          <div className="form-check me-3">
            <input
              className="form-check-input"
              type="radio"
              name="typeOfAddress"
              id="home"
              value="home"
              checked={formData.typeOfAddress === "home"}
              onChange={(e) =>
                setFormData({ ...formData, typeOfAddress: e.target.value })
              }
            />
            <label className="form-check-label" htmlFor="home">
              Home
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="typeOfAddress"
              id="office"
              value="office"
              checked={formData.typeOfAddress === "office"}
              onChange={(e) =>
                setFormData({ ...formData, typeOfAddress: e.target.value })
              }
            />
            <label className="form-check-label" htmlFor="office">
              Office
            </label>
          </div>
        </div>
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="isDefault"
          checked={formData?.isDefault}
          onChange={(e) => {
            setFormData({ ...formData, isDefault: e.target.checked });
          }}
        />
        <label className="form-check-label" htmlFor="isDefault">
          Make this is as my default address{" "}
        </label>
      </div>

      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-pink text-uppercase"
          data-bs-dismiss="modal"
        >
          {isEditing ? "Update Address" : "Add Address"}
        </button>
      </div>
    </form>
  );
};

export default AddEditUserAddressForm;
