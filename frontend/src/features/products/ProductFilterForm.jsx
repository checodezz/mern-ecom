import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../categories/categorySlice";

const ProductFilterForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <form className="py-4 px-3">
      {/* clear filters */}
      <div className="d-flex justify-content-between mb-3">
        <label className="form-label fw-bold">Filters</label>
        <Link type="button" className="text-pink fw-semibold">
          Clear All
        </Link>
      </div>

      {/* price */}
      <div className="mb-3">
        <label className="form-label fw-bold">Price</label>
        <div className="d-flex justify-content-between">
          <span>0</span>
          <span>90</span>
          <span>1000</span>
        </div>
        <input type="range" id="price" min="0" max="1000" className="w-100" />
      </div>

      {/* categories */}
      <div className="mb-3">
        <label className="form-label fw-bold">Category</label>
        {categories?.map((category) => (
          <div className="form-check" key={category._id}>
            <input
              className="form-check-input"
              type="checkbox"
              value={category.value}
              id={category._id}
              name={category.value}
              checked={categories.includes(`${category.value}`)}
            />
            <label className="form-check-label" htmlFor={category._id}>
              {category.label}
            </label>
          </div>
        ))}
      </div>

      {/* rating */}
      <div className="mb-3">
        <label className="form-label fw-bold">Rating</label>
        {[4, 3, 2, 1].map((rating) => (
          <div className="form-check" key={rating}>
            <input
              className="form-check-input"
              type="radio"
              value={rating}
              id={`rating${rating}AndAbove`}
              name="rating"
            />
            <label
              className="form-check-label"
              htmlFor={`rating${rating}AndAbove`}
            >
              {rating} stars & above
            </label>
          </div>
        ))}
      </div>

      {/* sort by price */}
      <div className="mb-3">
        <label className="form-label fw-bold">Sort by</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value="asc"
            id="asc"
            name="sortByPrice"
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
          />
          <label className="form-check-label" htmlFor="desc">
            Price - High to Low
          </label>
        </div>
      </div>
    </form>
  );
};

export default ProductFilterForm;
