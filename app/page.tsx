import Banner from "./components/layout/Banner";
import CategoryProduct from "./components/home/CategoryProduct";
import TopProduct from "./components/home/TopProduct";
import BrandProduct from "./components/home/BrandProduct";
import ListProduct from "./components/home/ListProduct";
import FormWatchProduct from "./components/home/FormWatchProduct";
import FormGlassProduct from "./components/home/FormGlassProduct";
export default function Home() {
  return (
    <>
      {/* Hero Banner + Stats */}
      <Banner />

      {/* Category */}
      <CategoryProduct />

      {/* Top Selling Products */}
      <TopProduct />

      {/* Brand Section */}
      <BrandProduct />

      <FormWatchProduct />

      <FormGlassProduct />
      {/* All Products */}
      <ListProduct />
    </>
  );
}
