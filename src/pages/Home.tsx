// src/pages/Home.tsx
import Header from "../component/Header/Header";       // هیرو
import BannerTop from "../component/Banners/BannerTop";
import Slider from "../component/ProductCards/Slider";
import BannerBottom from "../component/Banners/BannerBottom";
import CategorySection from "../component/Category/CategorySection";
import FAQ from "../component/BrandValue/FAQ";

function HomePage() {
  return (
    <>
      <Header />
      <BannerTop />
      <Slider />
      <BannerBottom />
      <CategorySection />
      <FAQ />
    </>
  );
}

export default HomePage;