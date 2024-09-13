import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../categories/categorySlice";
import {
  clearAllFilters,
  fetchAllProducts,
  setFiltersPrice,
  setFiltersRating,
  setFiltersSelectedCategories,
  setFiltersSortByPrice,
  setMinMaxPrice,
} from "./productSlice";
import { calculateMaxPrice, calculateMinPrice } from "../../utils/helpers";

const ProductFilterForm = ({ filteredProducts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { sortByPrice, selectedCategories, rating, minPrice, maxPrice } =
    useSelector((state) => state.products.filters);

  const params = Object.fromEntries(searchParams.entries());
  // console.log(params.category);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      const min = calculateMinPrice(filteredProducts);
      const max = calculateMaxPrice(filteredProducts);
      dispatch(setMinMaxPrice({ minPrice: min, maxPrice: max }));
    }
  }, [filteredProducts, dispatch]);

  const [initialUrl, setInitialUrl] = useState(""); // Store the initial URL

  const categories = useSelector((state) => state.categories.categories);

  const handleUrlChange = (key, value) => {
    // Update query params in URL
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    if (!initialUrl) {
      setInitialUrl(`${location.pathname}${location.search}`);
    }
    dispatch(fetchAllCategories());
    dispatch(fetchAllProducts());
  }, [dispatch, location.pathname, location.search, initialUrl]);

  return (
    <form className="py-4 px-3">
      {/* Clear filters */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <label className="form-label fw-bold">Filters</label>
        <button
          type="button"
          className="btn py-0 text-pink fw-semibold"
          onClick={() => {
            dispatch(clearAllFilters());
            if ("subCategory" in params) {
              navigate("/products");
            } else {
              navigate(initialUrl);
            }
            window.location.reload();
          }}
        >
          Clear All
        </button>
      </div>
      <hr />

      {/* Sort by price */}
      <div className="mb-3">
        <label className="form-label fw-bold">Sort by</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="asc"
            id="asc"
            name="sortByPrice"
            checked={
              sortByPrice === "asc" || params.sortByPrice === sortByPrice
            }
            onChange={(e) => {
              handleUrlChange("sortByPrice", e.target.value);
              dispatch(setFiltersSortByPrice(e.target.value));
            }}
          />
          <label className="form-check-label" htmlFor="asc">
            Price - Low to High
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="desc"
            id="desc"
            name="sortByPrice"
            checked={
              sortByPrice === "desc" || params.sortByPrice === sortByPrice
            }
            onChange={(e) => {
              handleUrlChange("sortByPrice", e.target.value);
              dispatch(setFiltersSortByPrice(e.target.value));
            }}
          />
          <label className="form-check-label" htmlFor="desc">
            Price - High to Low
          </label>
        </div>
      </div>
      <hr />

      {/* Categories */}
      <div className="mb-3">
        <label className="form-label fw-bold">Category</label>
        {categories?.map((category) => (
          <div className="form-check" key={category._id}>
            <input
              className="form-check-input"
              type="checkbox"
              value={category.value}
              id={category._id}
              checked={
                selectedCategories.includes(category.value) ||
                selectedCategories.includes(params.category)
              }
              name={category.value}
              onChange={(e) => {
                handleUrlChange(
                  "selectedCategories",
                  e.target.checked
                    ? [...selectedCategories, category.value]
                    : selectedCategories.filter((cat) => cat !== category.value)
                );
                dispatch(
                  setFiltersSelectedCategories(
                    e.target.checked
                      ? [...selectedCategories, category.value]
                      : selectedCategories.filter(
                          (cat) => cat !== category.value
                        )
                  )
                );
              }}
            />
            <label className="form-check-label" htmlFor={category._id}>
              {category.label}
            </label>
          </div>
        ))}
      </div>
      <hr />

      {/* Rating */}
      <div className="mb-3">
        <label className="form-label fw-bold">Rating</label>
        {[4, 3, 2, 1].map((el) => (
          <div className="form-check" key={el}>
            <input
              className="form-check-input"
              type="radio"
              value={el}
              id={`rating${el}AndAbove`}
              name="rating"
              checked={rating == el || params.rating == rating}
              onChange={(e) => {
                handleUrlChange("rating", e.target.value);
                dispatch(setFiltersRating(e.target.value));
              }}
            />
            <label className="form-check-label" htmlFor={`rating${el}AndAbove`}>
              {el} stars & above
            </label>
          </div>
        ))}
      </div>
      <hr />

      {/* Price */}
      <div className="mb-3">
        <label className="form-label fw-bold">Price</label>
        <p>Select Price Range</p>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0 pb-0 text-secondary">Min Amount</p>
            <input
              type="number"
              className="form-control"
              style={{ width: "120px" }}
              value={minPrice}
              onChange={(e) =>
                dispatch(setMinMaxPrice({ minPrice: e.target.value, maxPrice }))
              }
            />
          </div>
          <div>
            <p className="mb-0 pb-0 text-secondary">Max Amount</p>
            <input
              type="number"
              className="form-control"
              style={{ width: "120px" }}
              value={maxPrice}
              onChange={(e) =>
                dispatch(setMinMaxPrice({ minPrice, maxPrice: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="position-relative my-2">
          <input
            type="range"
            className="form-range position-absolute start-0"
            min="0"
            max="1000"
            value={minPrice}
            onChange={(e) => {
              dispatch(setMinMaxPrice({ minPrice: e.target.value, maxPrice }));
            }}
            style={{ zIndex: minPrice > maxPrice ? 0 : 1 }}
          />
          <input
            type="range"
            className="form-range position-absolute start-0"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => {
              dispatch(setMinMaxPrice({ minPrice, maxPrice: e.target.value }));
            }}
          />
        </div>
        <button
          className="btn btn-pink mt-5 w-100 fw-semibold"
          onClick={(e) => {
            e.preventDefault();
            dispatch(setFiltersPrice({ minPrice, maxPrice }));
            navigate({
              pathname: location.pathname,
              search: searchParams.toString(),
            });
          }}
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default ProductFilterForm;
