import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Cards from "./Cards";
import { ScrollReveal } from "../ScrollReveal";
import { useProducts } from "../../hooks/useProducts"; // 👈 جدید

const navBtn =
  "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-dark/20 text-dark transition duration-300 hover:bg-dark hover:text-primary disabled:pointer-events-none disabled:opacity-30";

const mobileNavBtn =
  "flex h-12 min-w-28 cursor-pointer items-center justify-center gap-2 rounded-full border border-dark/25 bg-primary px-6 text-sm font-bold text-dark shadow-sm transition duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-30";

function Slider() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // 👇 دیتا از کش مشترک — همون queryKey: ["products"]
  const { data, isPending, isError, refetch } = useProducts();
  const products = data?.slice(0, 12) ?? []; // ۵ تا اول — بعداً «پرفروش‌ترین» از سرور

  const syncNavState = (s: SwiperType) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };

  // ۱) لودینگ → اسکلتون (همه‌ی هوک‌ها بالان، return های شرطی پایین — قانون همیشگی!)
  if (isPending) {
    return (
      <ScrollReveal className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-25">
        <div className="mb-6">
          <p className="small-text text-secondary">Liora Bestsellers</p>
          <h2 className="section-title text-dark">محبوب‌ترین محصولات</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-3xl bg-white/60 p-4">
              <div className="h-44 rounded-2xl bg-accent/50" />
              <div className="mt-3 h-4 w-2/3 rounded-full bg-accent/40" />
              <div className="mt-2 h-3 w-1/3 rounded-full bg-accent/40" />
            </div>
          ))}
        </div>
      </ScrollReveal>
    );
  }

  // ۲) ارور → پیام کوچیک با تلاش مجدد (کل صفحه‌ی خانه رو نمی‌شکنیم)
  if (isError) {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-4 py-10 text-center sm:px-8 lg:px-25">
        <p className="small-text text-dark/50">محصولات بارگذاری نشد</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="cursor-pointer rounded-full bg-dark px-8 py-3 text-sm font-bold text-primary transition hover:bg-secondary active:scale-95"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  // ۳) موفقیت → اسلایدر عادی
  return (
    <ScrollReveal className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-25">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="small-text text-secondary">Liora Bestsellers</p>
          <h2 className="section-title text-dark">محبوب‌ترین محصولات</h2>
        </div>

        <div className="hidden gap-3 md:flex">
          <button
            type="button"
            aria-label="محصولات قبلی"
            disabled={isBeginning}
            onClick={() => swiper?.slidePrev()}
            className={navBtn}
          >
            <FiArrowRight className="text-lg" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="محصولات بعدی"
            disabled={isEnd}
            onClick={() => swiper?.slideNext()}
            className={navBtn}
          >
            <FiArrowLeft className="text-lg" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[A11y, Keyboard]}
        onSwiper={(s) => {
          setSwiper(s);
          syncNavState(s);
        }}
        onSlideChange={syncNavState}
        onResize={syncNavState}
        dir="rtl"
        keyboard={{ enabled: true, onlyInViewport: true }}
        a11y={{
          prevSlideMessage: "اسلاید قبلی",
          nextSlideMessage: "اسلاید بعدی",
        }}
        grabCursor
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className="w-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="h-auto">
            <Cards product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
        <button
          type="button"
          aria-label="محصولات قبلی"
          disabled={isBeginning}
          onClick={() => swiper?.slidePrev()}
          className={mobileNavBtn}
        >
          <FiArrowRight className="text-lg" aria-hidden="true" />
          قبلی
        </button>
        <button
          type="button"
          aria-label="محصولات بعدی"
          disabled={isEnd}
          onClick={() => swiper?.slideNext()}
          className={mobileNavBtn}
        >
          بعدی
          <FiArrowLeft className="text-lg" aria-hidden="true" />
        </button>
      </div>
    </ScrollReveal>
  );
}

export default Slider;