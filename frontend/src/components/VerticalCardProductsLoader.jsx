const VarticalCardProductsLoader = () => {
  return (
    // Loading placeholder
    Array.from({ length: 5 }).map((_, index) => (
      <div
        className="card h-100 me-3"
        style={{ width: "300px", flexShrink: 0 }}
        key={index}
      >
        <div
          className="image-container col-12 bg-secondary-subtle d-flex justify-content-center align-items-center"
          style={{ height: "12rem" }}
        >
          <div
            className="pulse-animation bg-lightgrey rounded-start"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className="card-body">
          <div
            className="pulse-animation bg-lightgrey rounded"
            style={{
              height: "1.5rem",
              width: "70%",
            }}
          />
          <div
            className="pulse-animation bg-lightgrey rounded mt-2"
            style={{
              height: "1rem",
              width: "50%",
            }}
          />
          <div className="d-flex mt-3">
            <div
              className="pulse-animation bg-lightgrey rounded"
              style={{
                height: "1rem",
                width: "40%",
              }}
            />
            <div
              className="pulse-animation bg-lightgrey rounded ms-2"
              style={{
                height: "1rem",
                width: "40%",
              }}
            />
          </div>
          <button
            className="pulse-animation btn btn-light rounded-pill w-100 btn-sm mt-2"
            style={{
              height: "2rem",
            }}
          />
        </div>
      </div>
    ))
  );
};

export default VarticalCardProductsLoader;
