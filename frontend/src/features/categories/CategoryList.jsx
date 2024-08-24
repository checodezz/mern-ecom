import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "./categorySlice";
import { NavLink } from "react-router-dom";
import { fetchFilteredProducts } from "../products/productSlice";

const CategoryList = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <div className="col-lg-4 me-4 categories-list d-flex justify-content-around">
      <ul className="navbar-nav w-100">
        {categories?.map((category) => (
          <li
            key={category?._id}
            className="nav-item "
            style={{ marginRight: "20px" }}
          >
            <NavLink
              className="nav-link text-black text-decoration-none "
              to={`/products?category=${category?.value}`}
              onClick={() => dispatch(fetchFilteredProducts(category?.value))}
            >
              {category?.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
