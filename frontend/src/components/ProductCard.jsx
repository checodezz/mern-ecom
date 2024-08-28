import { Link } from "react-router-dom";
import { calculateDiscount, displayINRCurrency } from "../utils/helpers";
import ReactStars from "react-rating-stars-component";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductCardLoader from "./ProductCardLoader";

const ProductCard = ({ product, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <ProductCardLoader />
      ) : (
        <div
          className="card h-100 w-100"
          style={{ minWidth: "100%", maxWidth: "15rem" }}
        >
          <Link
            className="text-decoration-none text-black"
            to={`/products/${product._id}`}
          >
            <div
              className="image-container mx-auto mt-3"
              style={{
                width: "13rem",
                height: "12rem",
              }}
            >
              <img
                className="img-fluid product-image"
                src={product?.images[0]}
                alt={product?.name}
                style={{
                  objectFit: "contain",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />
            </div>

            <div className="card-body pb-0">
              <div className="d-flex justify-content-between">
                <div>
                  <h6
                    className="card-title text-truncate"
                    style={{ maxWidth: "12rem" }}
                  >
                    {product?.name}
                  </h6>
                </div>
              </div>

              {/* Price */}
              <div
                className="d-flex justify-content-start align-items-center"
                style={{ fontSize: "15px" }}
              >
                <p className="fw-semibold me-1 mb-0">
                  {displayINRCurrency(product?.sellingPrice)}
                </p>
                <p className="text-decoration-line-through text-secondary me-2 mb-0">
                  {displayINRCurrency(product?.price)}
                </p>

                <p className="text-success bg-lightgreen fw-semibold px-1 mb-0">
                  {calculateDiscount(product?.price, product?.sellingPrice)}%
                  off
                </p>
              </div>

              {/* Rating */}
              <div className="d-flex justify-content-start align-items-center">
                <span className="me-1">{product?.rating}</span>
                <ReactStars
                  count={1}
                  value={product?.rating}
                  size={25}
                  activeColor="#ffd700"
                  edit={false}
                />
              </div>
            </div>

            <div
              className="row"
              style={{
                marginLeft: "0.4px",
                marginRight: "0.4px",
                height: "45px",
              }}
            >
              <div className="col-3 center-content border-top">
                <Link type="button">
                  {product?.price > 0 ? (
                    <div className="text-dark">
                      <FaRegHeart size={25} />
                    </div>
                  ) : (
                    <div className="text-pink">
                      <FaHeart size={25} />
                    </div>
                  )}
                </Link>
              </div>
              <div
                className="col-9 center-content bg-pink"
                style={{ borderRadius: "0 0 5px 0" }}
              >
                <Link
                  type="button"
                  className="btn text-light text-decoration-none fw-semibold"
                >
                  Add to Cart
                </Link>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductCard;
