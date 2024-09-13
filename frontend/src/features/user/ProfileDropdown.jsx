import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCircleUser, FaRegHeart } from "react-icons/fa6";
import { logoutAsync } from "../auth/authSlice";
import { clearUserDetails } from "./userSlice";

import { FaRegUser } from "react-icons/fa6";
import { FiLogOut, FiMapPin } from "react-icons/fi";
import { BiReceipt } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";
import { ROLE } from "../../config";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const { message, isSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [dispatch, isSuccess, message, navigate]);

  const handleLogout = async () => {
    try {
      // Wait for logout to complete
      await dispatch(logoutAsync());

      // Now fetch user details with null to clear the data
      dispatch(clearUserDetails());

      // Navigate to the homepage
      navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <>
      {user ? (
        <div className="dropdown ms-2">
          <Link
            className="nav-link btn dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {user?.profilePic ? (
              <img
                className="img-fluid rounded-circle"
                src={user?.profilePic}
                alt={user?.name}
                style={{ width: "40px", height: "40px" }}
              />
            ) : (
              <FaRegCircleUser size={25} />
            )}
          </Link>
          <ul className="dropdown-menu">
            {user?.role === ROLE.ADMIN && (
              <li className="border-bottom">
                <Link
                  className="dropdown-item d-flex justify-content-start align-items-center"
                  to="/admin-panel/all-products"
                >
                  <div className="me-1 ">
                    <MdAdminPanelSettings />
                  </div>
                  <p className=" mb-0"> Admin Panel</p>
                </Link>
              </li>
            )}

            <li className="border-bottom">
              <Link
                className="dropdown-item d-flex justify-content-start align-items-center"
                to="/my/orders"
              >
                <div className="me-1 ">
                  <BiReceipt />
                </div>
                <p className=" mb-0">Orders</p>
              </Link>
            </li>

            <li className="border-bottom">
              <Link
                className="dropdown-item d-flex justify-content-start align-items-center"
                to="/wishlist"
              >
                <div className="me-1 ">
                  <FaRegHeart />
                </div>
                <p className=" mb-0">Wishlist</p>
              </Link>
            </li>

            <li className="border-bottom">
              <Link
                className="dropdown-item d-flex justify-content-start align-items-center"
                to="/my/profile/edit"
              >
                <div className="me-1 ">
                  <FaRegUser />
                </div>
                <p className=" mb-0">Edit Profile</p>
              </Link>
            </li>

            <li className="border-bottom">
              <Link
                className="dropdown-item d-flex justify-content-start align-items-center"
                to="/my/address"
              >
                <div className="me-1 ">
                  <FiMapPin />
                </div>
                <p className=" mb-0">Saved Addresses</p>
              </Link>
            </li>

            {user?._id && (
              <li>
                <Link
                  className="dropdown-item d-flex justify-content-start align-items-center"
                  type="button"
                  onClick={handleLogout}
                >
                  <div className="me-1 ">
                    <FiLogOut />
                  </div>
                  <p className=" mb-0">Logout</p>
                </Link>
              </li>
            )}
          </ul>
        </div>
      ) : (
        <Link className="btn btn-pink fw-semibold w-100" to="/login">
          Login
        </Link>
      )}
    </>
  );
};

export default ProfileDropdown;
