const CartSummaryLoader = () => {
  return (
    <div className="card h-100 bg-white">
      <div className="card-body">
        <div className="placeholder-glow">
          <h5 className="card-title fw-bold placeholder col-6"></h5>
          <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-3"></span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-3"></span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-3"></span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-3"></span>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <span className="placeholder col-5"></span>
            <span className="placeholder col-4"></span>
          </div>
          <hr className="mx-4" />
        </div>
      </div>
      <div className="card-footer placeholder-glow pulse-animation">
        <button
          className="btn text-teal fw-bold placeholder col-12 bg-slate-200 "
          disabled
        ></button>
      </div>
    </div>
  );
};

export default CartSummaryLoader;
