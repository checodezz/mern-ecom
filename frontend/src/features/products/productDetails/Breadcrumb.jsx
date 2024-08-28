import { NavLink } from "react-router-dom";
const Breadcrumb = ({ product }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="breadcrumb-item">
          <NavLink className="nav-link d-inline" to="/products">
            Products
          </NavLink>
        </li>
        <li className="breadcrumb-item">
          <NavLink
            className="nav-link d-inline"
            to={`/products?category=${product?.category}`}
          >
            {product?.category}
          </NavLink>
        </li>
        {product?.subCategory && (
          <li className="breadcrumb-item">
            <NavLink
              className="nav-link d-inline"
              to={`/products?subCategory=${product?.subCategory}`}
            >
              {product?.subCategory}
            </NavLink>
          </li>
        )}

        <li className="breadcrumb-item active" aria-current="page">
          <span className="fw-bold">{product?.name}</span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
