import React from "react";

const ProductInfoLoader = () => {
  return (
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
  );
};

export default ProductInfoLoader;
