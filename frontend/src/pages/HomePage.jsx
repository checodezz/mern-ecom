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
      toast.success(message);
    } else if (isError) {
      toast.error(message, {
        style: { backgroundColor: "#F44336", color: "white" },
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
        heading={"Top Headphones"}
      />

      <HorizontalCardProducts
        subCategory={"watches"}
        heading={"Popular Watches"}
      />

      <VerticalCardProducts
        subCategory={"mobile"}
        heading={"Trending Mobile"}
      />

      <VerticalCardProducts
        subCategory={"televisions"}
        heading={"Trending Televisions"}
      />

      <VerticalCardProducts
        subCategory={"clothing"}
        heading={"Trending in clothing"}
      />
    </div>
  );
};

export default HomePage;
