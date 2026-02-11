import Banner from "./components/layout/Banner";
import CategoryProduct from "./components/home/CategoryProduct";
import TopProduct from "./components/home/TopProduct";
import BrandProduct from "./components/home/BrandProduct";
import ListProduct from "./components/home/ListProduct";
import FormWatchProduct from "./components/home/FormWatchProduct";
import FormGlassProduct from "./components/home/FormGlassProduct";
import FormShoseProduct from "./components/home/FormShoseProduct";
import FormBadmintonProduct from "./components/home/FormBadmintonProduct";
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

      <FormBadmintonProduct />

      <FormGlassProduct />

      <FormShoseProduct />
      {/* All Products */}
      <ListProduct />
    </>
  );
}
