import img1 from "../assets/banner/img1.jpg";
import img2 from "../assets/banner/img2.jpg";
import img3 from "../assets/banner/img3.webp";
import img4 from "../assets/banner/img4.png";
import img5 from "../assets/banner/img5.jpg";
import img6 from "../assets/banner/img6.jpg";
import img7 from "../assets/banner/img7.webp";

const carouselImages = [img1, img2, img3, img4, img5, img6, img7];

const BannerProductCarousel = () => {
  return (
    <div className="">
      <div className="text-center slider-products">
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner ">
            {carouselImages.map((image, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                data-bs-interval="5000"
                key={index}
                style={{ height: "350px" }} // Set a fixed height or adjust as needed
              >
                <img
                  src={image}
                  className="d-block w-100 h-100 img-fluid"
                  alt={`Carousel Image ${index}`}
                  style={{
                    objectFit: "fill",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev justify-content-start left-arrow-icon"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-black rounded-circle "
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next justify-content-end right-arrow-icon"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-black rounded-circle"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerProductCarousel;
