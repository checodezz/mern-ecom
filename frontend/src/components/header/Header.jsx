import "./header.css";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { GrSearch } from "react-icons/gr";

import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "../../features/user/ProfileDropdown";
import CategoryList from "../../features/categories/CategoryList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountCartItems } from "../../features/cart/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalCartItems = useSelector((state) => state.cart.totalCartItems);
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    dispatch(getCountCartItems());
  }, [dispatch]);

  const handleSearch = (e) => {
    const { value } = e.target;
    if (value) {
      navigate(`/products?q=${value}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <header className="px-3">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand col-1" to="/">
            <span className="text-pink fw-bold fs-4">Emart</span>
          </Link>

          <CategoryList />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* search query div */}
            <div className="search-box col-md-3 col-12 w-75 position-relative">
              <form className="d-flex" role="search">
                <div className="position-absolute ms-2 fs-4">
                  <GrSearch />
                </div>
                <input
                  className="form-control me-2 border "
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </form>
            </div>
            <div className="d-flex col-md-3 col-3 justify-content-around align-items-center">
              <ProfileDropdown />

              {user && (
                <>
                  <Link
                    className="text-dark position-relative"
                    style={{ paddingLeft: "20px", paddingRight: "20px" }}
                    to="/wishlist"
                  >
                    <FaRegHeart size={25} />
                    <span className="position-absolute top-0 start-99 translate-middle badge rounded-pill bg-pink">
                      0
                    </span>
                  </Link>
                  <Link
                    className="text-dark position-relative text-decoration-none d-flex"
                    to="/cart"
                  >
                    <FaShoppingCart size={25} />
                    <span className="position-absolute top-0 start-100 translate-middle  badge rounded-pill bg-pink">
                      {totalCartItems ? totalCartItems : 0}
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
