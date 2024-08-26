const HorizontalCardProductsLoader = () => {
  return (
    // Loading placeholder
    Array.from({ length: 5 }).map((_, index) => (
      <div
        className="card h-100 me-3 "
        style={{ width: "300px", flexShrink: 0 }}
        key={index}
      >
        <div className="row g-0 mb-0 pb-0">
          <div
            className="col-md-5 bg-light d-flex justify-content-center align-items-center"
            style={{ height: "150px" }}
          >
            <div
              className="bg-lightgrey pulse-animation rounded-start"
              style={{
                width: "100%",
                height: "100%",
              }}
            ></div>
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <div
                className="bg-lightgrey pulse-animation mb-2"
                style={{
                  height: "1.5rem",
                  width: "80%",
                }}
              ></div>
              <div
                className="bg-lightgrey pulse-animation mb-2"
                style={{
                  height: "1rem",
                  width: "60%",
                }}
              ></div>
              <div className="d-flex mb-2">
                <div
                  className="bg-lightgrey pulse-animation me-2"
                  style={{
                    height: "1rem",
                    width: "40%",
                  }}
                ></div>
                <div
                  className="bg-lightgrey pulse-animation"
                  style={{
                    height: "1rem",
                    width: "40%",
                  }}
                ></div>
              </div>
              <div
                className="bg-lightgrey pulse-animation"
                style={{
                  height: "2rem",
                  width: "100%",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    ))
  );
};

export default HorizontalCardProductsLoader;
