import { useDispatch, useSelector } from "react-redux";
import BannerProductCarousel from "../components/BannerProductCarousel";
import HorizontalCardProducts from "../components/HorizontalCardProducts";
import VerticalCardProducts from "../components/VerticalCardProducts";
import SubCategoryListWithProducts from "../features/categories/SubCategoryListWithProducts";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { cartResetState } from "../features/cart/cartSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { message, isSuccess, isError } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        toastId: "success",
      });
    } else if (isError) {
      toast.error(message, {
        toastId: "error",
      });
    }
    dispatch(cartResetState());
  }, [message, isSuccess, isError, dispatch]);

  return (
    <div className=" overflow-x-scroll  scrollbar-none">
      <BannerProductCarousel />
      <SubCategoryListWithProducts />
      <HorizontalCardProducts
        subCategory={"headphones"}
        heading={"Top Headphones: Unmatched Sound Quality"}
      />

      <HorizontalCardProducts
        subCategory={"watches"}
        heading={"Timeless Pieces: Discover Popular Watches"}
      />

      <VerticalCardProducts
        subCategory={"mobile"}
        heading={"Top-Selling Smartphones of the Year"}
      />

      <VerticalCardProducts
        subCategory={"televisions"}
        heading={
          "Best-Selling Televisions: Experience the Future of Entertainment"
        }
      />

      <VerticalCardProducts
        subCategory={"clothing"}
        heading={"Discover the Latest Trends"}
      />
    </div>
  );
};

export default HomePage;
