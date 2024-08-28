import React from "react";

const ProductDescription = ({ description, isLoading }) => {
  const details = description.split(". ");
  const detailsLoading = new Array(4).fill(null);

  return (
    <div className="pe-5">
      <h6 className="fw-bold text-uppercase">Product Details</h6>
      <ul>
        {isLoading
          ? detailsLoading.map((_, index) => (
              <li
                key={index}
                className="bg-slate-200 pulse-animation mb-2"
                style={{ height: "1rem", width: "80%" }}
              ></li>
            ))
          : details?.map((detail, index) => <li key={index}>{detail}</li>)}
      </ul>
    </div>
  );
};

export default ProductDescription;
