const ProductCardLoader = () => {
  return new Array(4).fill(null).map((_, index) => (
    <div key={index} className="col-md-3">
      <div
        className="card h-100 w-100"
        style={{ minWidth: "100%", maxWidth: "320px" }}
      >
        <div
          className="image-container mx-auto mt-3 bg-slate-200 pulse-animation"
          style={{
            width: "13rem",
            height: "12rem",
          }}
        ></div>

        <div className="card-body pb-0">
          <div className="d-flex justify-content-between">
            <div
              className="bg-slate-200 pulse-animation"
              style={{ height: "1.5rem", width: "12rem" }}
            ></div>
          </div>

          {/* Price Loader */}
          <div className="d-flex justify-content-start align-items-center mt-2">
            <div
              className="bg-slate-200 pulse-animation me-2"
              style={{ height: "1.2rem", width: "4rem" }}
            ></div>
            <div
              className="bg-slate-200 pulse-animation me-2"
              style={{ height: "1.2rem", width: "3rem" }}
            ></div>
            <div
              className="bg-slate-200 pulse-animation"
              style={{ height: "1.2rem", width: "2.5rem" }}
            ></div>
          </div>

          {/* Rating Loader */}
          <div className="d-flex justify-content-start align-items-center mt-2">
            <div
              className="bg-slate-200 pulse-animation me-2"
              style={{ height: "1.5rem", width: "2rem" }}
            ></div>
            <div
              className="bg-slate-200 pulse-animation"
              style={{ height: "1.5rem", width: "1.5rem" }}
            ></div>
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
          <div className="col-3 center-content border-top bg-slate-200 pulse-animation">
            <div style={{ width: "25px", height: "25px" }}></div>
          </div>
          <div
            className="col-9 center-content bg-slate-200 pulse-animation"
            style={{ borderRadius: "0 0 5px 0" }}
          ></div>
        </div>
      </div>
    </div>
  ));
};

export default ProductCardLoader;
