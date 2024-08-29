const CartItemsLoader = () => {
  return (
    <div className="bg-white p-3">
      <h2 className="placeholder-glow">
        <span className="placeholder col-3"></span>
        <span className="small placeholder col-2 text-teal ms-2"></span>
      </h2>
      <hr className="mb-0" />
      <ul className="list-group list-group-flush">
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            className="list-group-item d-flex position-relative placeholder-glow"
            key={index}
          >
            <div className="row g-4 mb-0 ms-5 pt-3">
              <div
                className="col-md-4 d-flex justify-content-center align-items-center pulse-animation"
                style={{ width: "8rem", height: "8rem" }}
              >
                <div
                  className="image-container bg-slate-200 "
                  style={{ width: "8rem", height: "8rem" }}
                ></div>
              </div>

              <div className="col-md-8">
                <div className="ms-md-5" style={{ minWidth: "32rem" }}>
                  <h5 className="placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h5>

                  <div className="d-flex justify-content-start align-items-center pe-5">
                    <p className="placeholder-glow fw-bold">
                      <span className="placeholder col-4"></span>
                    </p>
                    <p className="placeholder-glow text-decoration-line-through text-secondary mx-2">
                      <span className="placeholder col-3"></span>
                    </p>
                    <p className="placeholder-glow bg-lightgreen fw-semibold px-1">
                      <span className="placeholder col-2"></span>
                    </p>
                  </div>

                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center me-3 mt-1 bg-light rounded"
                      style={{ width: "8rem" }}
                    >
                      <span className="placeholder col-2 bg-danger"></span>
                      <span className="fs-5 text-white mx-2">1</span>
                      <span className="placeholder col-2 bg-success"></span>
                    </div>
                    <div className="ms-2 placeholder-glow">
                      <span className="placeholder col-4"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <hr className="mt-0 pt-0" />
      <div className="d-flex justify-content-end placeholder-glow">
        <h5>
          <span className="placeholder col-6"></span>
        </h5>
      </div>
    </div>
  );
};

export default CartItemsLoader;
