import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";

const AdminPanelPage = () => {
  const user = useSelector((state) => state.user.user);
  // console.log(user);

  return (
    <div className="d-flex min-h" style={{ minHeight: "calc(100vh - 100px)" }}>
      <aside
        className="bg-white flex-shrink-0 custom-shadow"
        style={{ width: "280px" }}
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
        {/* admin navigation */}
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
      <main className="flex-grow-1 p-4 w-100 h-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanelPage;
