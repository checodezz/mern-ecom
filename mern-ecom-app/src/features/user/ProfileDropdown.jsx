import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { logoutAsync } from "../auth/authSlice";
import { fetchUserDetails } from "./userSlice";

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

  return (
    <>
      {user ? (
        <div className="dropdown">
          <Link
            className="nav-link "
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {user?.profilePic ? (
              <img
                className="img-fluid rounded-circle"
                src={user?.profilePic}
                alt={user?.name}
                style={{ width: "35px", height: "35px" }}
              />
            ) : (
              <FaRegCircleUser size={25} />
            )}
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/admin-panel">
                Admin Panel
              </Link>
            </li>

            <li>
              <Link className="dropdown-item" to="#">
                Profile
              </Link>
            </li>

            {user?._id && (
              <li>
                <Link
                  className="dropdown-item"
                  type="button"
                  onClick={() => {
                    dispatch(logoutAsync(user._id));
                    dispatch(fetchUserDetails(null));
                  }}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      ) : (
        <Link className="btn btn-pink fw-semibold" to="/login">
          Login
        </Link>
      )}
    </>
  );
};

export default ProfileDropdown;
