import { Link } from "react-router-dom";
import { TbHeart, TbHeartFilled, TbHeartPlus } from "react-icons/tb";
import ReactStars from "react-rating-stars-component";
import { calculateDiscount, displayINRCurrency } from "../../../utils/helpers";

const ProductInfo = ({ product, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="product-info">
          <div className="pe-5">
            <div
              className="bg-slate-200 pulse-animation mb-2"
              style={{ height: "2rem", width: "50%" }}
            ></div>
            <div
              className="bg-slate-200 pulse-animation mb-2"
              style={{ height: "1.5rem", width: "70%" }}
            ></div>
            <div
              className="bg-slate-200 pulse-animation mb-2"
              style={{ height: "1rem", width: "30%" }}
            ></div>
          </div>
          <hr />

          <div className="card-text d-flex justify-content-start align-items-center pe-5">
            <div
              className="bg-slate-200 pulse-animation me-2"
              style={{ height: "2rem", width: "40%" }}
            ></div>
            <div
              className="bg-slate-200 pulse-animation mx-2"
              style={{ height: "1.5rem", width: "20%" }}
            ></div>
            <div
              className="bg-slate-200 pulse-animation"
              style={{ height: "1.5rem", width: "20%" }}
            ></div>
          </div>
          <div
            className="bg-slate-200 pulse-animation mb-2"
            style={{ height: "1rem", width: "50%" }}
          ></div>

          {/* Wishlist and Cart Button Loaders */}
          <div className="d-grid gap-3 d-md-flex my-4 pe-5">
            <div
              className="bg-slate-200 pulse-animation"
              style={{ minWidth: "250px", height: "48px" }}
            ></div>
            <div
              className="bg-slate-200 pulse-animation"
              style={{ minWidth: "300px", height: "48px" }}
            ></div>
          </div>
          <hr />
        </div>
      ) : (
        <div>
          <div className="pe-5">
            <h2 className="card-title m-0">{product?.brandName}</h2>
            <h5 className="card-text text-grey">{product?.name}</h5>
            <p
              className="card-text border border-1 px-2 center-content"
              style={{ width: "80px", height: "30px" }}
            >
              <span className="me-1 fw-bold">{product?.rating}</span>
              <ReactStars
                count={1}
                size={20}
                value={product?.rating}
                activeColor="#ffd700"
                edit={false}
              />
            </p>
          </div>
          <hr />

          <div className="card-text d-flex justify-content-start align-items-center pe-5">
            <p className="fw-bold fs-4">
              {displayINRCurrency(product?.sellingPrice)}
            </p>
            <p
              className="card-text text-muted fw-light fs-5 mx-2"
              style={{ fontSize: "18px" }}
            >
              MRP ₹
              <span className="text-decoration-line-through">
                {product?.price}
              </span>{" "}
            </p>
            <p className="text-success fw-bold fs-5">
              ({calculateDiscount(product?.price, product?.sellingPrice)}% OFF)
            </p>
          </div>
          <p className="text-success fw-bold">Inclusive of all taxes</p>

          {/* add to wishlist and add to bag button */}
          <div className="d-grid gap-3 d-md-flex my-4 pe-5">
            <Link
              className="btn border border-1 center-content rounded-0"
              style={{ minWidth: "250px", height: "48px" }}
            >
              <TbHeartPlus style={{ fontSize: "24px" }} />{" "}
              <span className="mx-2 fw-semibold">Add to Wishlist</span>
            </Link>
            <Link
              className="btn btn-pink center-content rounded-0 fw-semibold w-100"
              style={{ minWidth: "300px", height: "48px" }}
            >
              Add to Cart
            </Link>
          </div>

          {/* <div className="d-grid gap-2 d-md-flex my-4">
    <Link
      className="btn border border-1 center-content rounded-0"
      style={{ minWidth: "206px", height: "48px" }}
    >
      <TbHeartFilled
        className="text-pink"
        style={{ fontSize: "24px" }}
      />{" "}
      <span className="mx-2 fw-semibold">Added to Wishlist</span>
    </Link>
    <Link
      className="btn btn-pink center-content rounded-0 fw-semibold w-100 "
      style={{ minWidth: "300px", height: "48px" }}
    >
      View Cart
    </Link>
  </div> */}

          <hr />
        </div>
      )}
    </>
  );
};

export default ProductInfo;
