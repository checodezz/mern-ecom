import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountWishlistProducts,
  getWishlistProducts,
} from "../features/wishlist/wishlistSlice";
import WishlistProductCard from "../features/wishlist/WishlistProductCard";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { wishlistProducts, wishlistProductCount } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(getWishlistProducts());
    dispatch(getCountWishlistProducts());
  }, [dispatch]);

  return (
    <main className="container-fluid  px-4 py-4">
      <div className="w-100 bg-white text-center py-1">
        <h1>
          My Wishlist{" "}
          <span className="text-pink">({wishlistProductCount})</span>
        </h1>
      </div>
      {wishlistProducts?.length === 0 ? (
        <div></div>
      ) : (
        <div className="row g-3 my-2">
          {wishlistProducts?.map((item) => {
            const product = item.productId;
            return (
              <div
                className="col-lg-3 col-md-4"
                key={item?._id}
                // style={{ minHeight: "calc(100vh - 284px)" }}
              >
                <WishlistProductCard product={product} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default WishlistPage;
