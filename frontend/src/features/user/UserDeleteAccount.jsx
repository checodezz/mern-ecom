import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserAccount, fetchUserDetails } from "./userSlice";
import { toast } from "react-toastify";
import DeleteAccountImage from "../../assets/delete-account.jpg";

const UserDeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    } else if (isError) {
      toast.error(message);
    }
  }, [message, isSuccess, isError]);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleDeleteClick = () => {
    if (isChecked) {
      dispatch(deleteUserAccount()).then(() => {
        dispatch(fetchUserDetails(null));
        navigate("/");
      });
    }
  };

  return (
    <div className="container-fluid pe-5 ">
      <div className="bg-white p-4 me-5">
        <div className="border-bottom">
          <h5 className="fw-bold">Delete Account</h5>
        </div>

        <div className="my-5 d-flex justify-content-center align-items-center">
          <img
            src={DeleteAccountImage}
            alt="Account delete image"
            className="img-fluid "
          />
        </div>

        <div className="">
          <h5 className="fw-bold">
            Are you sure you want to delete your account?
          </h5>
          <p className="fw-bold">
            By deleting your account, you acknowledge the following:
          </p>
          <ul className="">
            <li>
              Your order history, saved details, and all benefits will be lost.
            </li>
            <li>
              Any account-related benefits will be forfeited and cannot be
              recovered.
            </li>
            <li>
              Pending orders, exchanges, returns, or refunds may not be
              accessible after deletion.
            </li>
            <li>
              We will attempt to complete open transactions within the next 30
              days, but tracking may not be guaranteed.
            </li>
            {/* <li>
              You may not receive New User coupons if you create a new account
              with the same details.
            </li> */}
            <li>
              Account deletion may be refused or delayed if there are pending
              grievances related to orders or services.
            </li>
            <li>
              We may retain certain data for security, fraud prevention,
              regulatory compliance, or legal reasons.
            </li>
          </ul>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="terms">
              I agree to all the terms and conditions *
            </label>
          </div>

          <div className="d-flex d-grid gap-3">
            <button
              type="button"
              className={`btn ${
                isChecked ? "btn-outline-danger" : "btn-secondary"
              } w-100 fw-bold`}
              onClick={handleDeleteClick}
              disabled={!isChecked}
            >
              Delete Anyway
            </button>
            <Link
              type="button"
              className="btn btn-pink w-100 fw-bold"
              onClick={handleDeleteClick}
              to="/"
            >
              Keep Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteAccount;
