import React from "react";

const ProductDetailsImageLoader = () => {
  const productImageListLoading = new Array(4).fill(null);

  return (
    <div className="container">
      <div className="row g-3">
        {/* Image Loader Section */}
        <div className="col-sm-2 me-3 d-flex flex-sm-column overflow-scroll scrollbar-none h-100 ">
          {productImageListLoading.map((_, index) => (
            <div
              key={index}
              className="bg-slate-200 rounded p-2 mb-2 image-container pulse-animation"
              style={{ height: "5rem", width: "5rem" }}
            ></div>
          ))}
        </div>

        {/* Placeholder Section */}
        <div
          className="col-9 bg-slate-200 pulse-animation d-flex align-items-center justify-content-center"
          style={{ height: "25rem" }}
        ></div>
      </div>
    </div>
  );
};

export default ProductDetailsImageLoader;
