import { useDispatch, useSelector } from "react-redux";
import ProductDetailsImageLoader from "./ProductDetailsImageLoader";
import { useCallback, useEffect, useState } from "react";
import { setProductDetailsActiveImage } from "../productSlice";

const ProductDetailsImage = ({ product, isLoading }) => {
  const dispatch = useDispatch();

  if (!product || !product.images || product.images.length === 0) {
    return <div>No image available</div>;
  }

  const { productDetailsActiveImage } = useSelector((state) => state.products);
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (product?.images?.length > 0) {
      dispatch(setProductDetailsActiveImage(product.images[0]));
    }
  }, [dispatch, product?.images]);

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  return (
    <div className="col-md-5" style={{ height: "24rem" }}>
      <div className="w-100 h-100" style={{ height: "384px" }}>
        {isLoading ? (
          <ProductDetailsImageLoader />
        ) : (
          <div className="row">
            {/* product images */}
            <div className="col-sm-2 me-sm-3 d-flex flex-sm-column  overflow-scroll scrollbar-none h-100">
              {product?.images?.map((imageUrl, index) => (
                <div
                  key={index}
                  className="bg-light rounded p-2 mb-2 image-container"
                  style={{ height: "5rem", width: "5rem" }}
                >
                  <img
                    src={imageUrl}
                    alt={`Product Image ${index + 1}`}
                    className="img-fluid product-image cursor-pointer"
                    onMouseEnter={() =>
                      dispatch(setProductDetailsActiveImage(imageUrl))
                    }
                    onClick={() =>
                      dispatch(setProductDetailsActiveImage(imageUrl))
                    }
                  />
                </div>
              ))}
            </div>

            {/* product image */}
            <div
              className="col-10 rounded product-details-image image-container position-relative"
              style={{ height: "25rem", width: "25rem", padding: "1rem" }}
            >
              <img
                src={productDetailsActiveImage}
                alt={productDetailsActiveImage}
                className="product-image img-fluid w-100"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
              />

              {/* product zoom image */}
              {zoomImage && (
                <div
                  className="position-absolute bg-white product-zoom-image image-container"
                  style={{
                    width: "300px",
                    height: "300px",
                    border: "1px solid #000",
                    right: "-570px",
                    top: "0",
                    zIndex: 10,
                    overflow: "hidden",
                    minWidth: "500px",
                    minHeight: "510px",
                  }}
                >
                  <div
                    className="w-100 h-100"
                    style={{
                      backgroundImage: `url(${productDetailsActiveImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                        zoomImageCoordinate.y * 100
                      }%`,
                      backgroundSize: "200%",
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsImage;
