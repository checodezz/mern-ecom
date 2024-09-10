import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { logoutAsync } from "../features/auth/authSlice";
import { fetchUserDetails } from "../features/user/userSlice";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <div className="d-flex min-h" style={{ minHeight: "calc(100vh - 100px)" }}>
      <aside
        className="bg-white flex-shrink-0 custom-shadow d-flex flex-column"
        style={{ width: "280px" }}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "180px" }}
        >
          <div>
            <Link
              role="button"
              className="text-black w-100 center-content text-decoration-none"
            >
              {user?.profilePic ? (
                <img
                  className="img-fluid rounded-circle"
                  src={user?.profilePic}
                  alt={user?.name}
                  style={{ width: "80px", height: "80px" }}
                />
              ) : (
                <FaRegCircleUser size={50} />
              )}
            </Link>
          </div>
          <p className="text-capitalize mb-0 fw-bold mt-1">{user?.name}</p>
        </div>
        {/* user navigation */}
        <nav className="flex-grow-1">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                to={"/my/dashboard"}
              >
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                to={"/my/profile/edit"}
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                to={"orders"}
              >
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                to={"/my/address"}
              >
                Addresses
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                to={"/my/user/delete"}
              >
                Delete Account
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto p-3">
          <Link
            className="btn btn-pink fw-semibold w-100"
            type="button"
            onClick={() => {
              dispatch(logoutAsync(user._id)).then(() => {
                dispatch(fetchUserDetails(null));
                navigate("/");
              });
            }}
          >
            Logout
          </Link>
        </div>
      </aside>
      <main className="flex-grow-1 p-4 w-100 h-100">
        <Outlet />
      </main>
    </div>
  );
};

export default UserProfilePage;
