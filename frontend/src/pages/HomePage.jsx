import BannerProductCarousel from "../components/BannerProductCarousel";
import HorizontalCardProducts from "../components/HorizontalCardProducts";
import VerticalCardProducts from "../components/VerticalCardProducts";
import SubCategoryListWithProducts from "../features/categories/SubCategoryListWithProducts";

const HomePage = () => {
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
        subCategory={"refrigerators"}
        heading={"Trending REfrigrators"}
      />

      <VerticalCardProducts
        subCategory={"televisions"}
        heading={"Trending Televisions"}
      />
    </div>
  );
};

export default HomePage;
