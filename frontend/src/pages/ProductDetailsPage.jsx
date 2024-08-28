import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  setProductDetailsActiveImage,
} from "../features/products/productSlice";

import Breadcrumb from "../features/products/productDetails/Breadcrumb";
import ProductDetailsImage from "../features/products/productDetails/ProductDetailsImage";
import ProductInfo from "../features/products/productDetails/ProductInfo";
import { useParams } from "react-router-dom";
import ProductDescription from "../features/products/productDetails/ProductDescription";
import SimilarProducts from "../features/products/productDetails/SimilarProducts";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const productDetailsRef = useRef(null);

  const { productDetails: product, isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (productDetailsRef.current) {
      productDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [product]);

  return (
    <main
      ref={productDetailsRef}
      className="container-fluid px-4 py-4 bg-white"
    >
      <Breadcrumb product={product} />
      <div className="row g-5" style={{ minHeight: "200px" }}>
        {/* product image part */}
        <ProductDetailsImage product={product} isLoading={isLoading} />

        {/* product info part */}
        <div className="col-md-7">
          <div className="card border-0 mb-4">
            <div className="card-body">
              <ProductInfo product={product} isLoading={isLoading} />

              {/* product description */}
              {product?.description && (
                <ProductDescription
                  description={product?.description}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* similar products */}
      <SimilarProducts subCategory={product?.subCategory} />
    </main>
  );
};

export default ProductDetails;
