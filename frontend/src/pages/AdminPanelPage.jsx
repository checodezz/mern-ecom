import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminPanelPage = () => {
  const user = useSelector((state) => state.user.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className="d-flex d-grid min-h justify-content-between align-items-start"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      {/* Toggle button next to the Outlet content */}
      <button
        className="btn btn-light d-md-none mt-4 ms-3"
        onClick={toggleSidebar}
        style={{
          // position: "absolute",
          // top: "20px",
          left: isSidebarOpen ? "300px" : "20px",
          height: isSidebarOpen ? "100%" : "50px",
          zIndex: 1000,
        }}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white custom-shadow ${
          isSidebarOpen ? "d-block" : "d-none"
        } d-md-block`}
        style={{
          width: "280px",
          position: isSidebarOpen ? "absolute" : "static",
          // top: "0",
          left: "0",
          height: "100vh",
          zIndex: 999,
        }}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            height: "200px",
          }}
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
          <p className="text-capitalize mb-0 fw-bold">{user?.name}</p>
          <p className="mb-0">{user?.role}</p>
        </div>

        {/* Admin Navigation */}
        <nav>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                to={"all-users"}
              >
                All Users
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                to={"all-products"}
              >
                All Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-decoration-none hover-bg-slate-200 px-4"
                to={"all-categories"}
              >
                All Categories
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 w-100 h-100 ">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanelPage;
