import { useState } from "react";
import { ScrollReveal } from "../ScrollReveal";
import pic1 from "../../assets/banner2-1.webp";
import pic2 from "../../assets/banner2-2.webp";
import { FiRefreshCw } from "react-icons/fi";

const FRONT = "z-20 translate-x-0 translate-y-0 shadow-md";

// 👇 بیرون‌زدگی موبایل = ۱۴px (کمتر از پدینگ ۱۶px سکشن) → هیچ‌وقت از صفحه بیرون نمی‌زنه
const BACK =
  "z-10 -translate-x-3.5 translate-y-3.5 sm:-translate-x-5 sm:translate-y-5 lg:-translate-x-7 lg:translate-y-7 shadow-2xl brightness-90 group-hover:-translate-x-4 group-hover:translate-y-4 sm:group-hover:-translate-x-6 sm:group-hover:translate-y-6";

function BannerBottom() {
  const [isSwapped, setIsSwapped] = useState(false);

  return (
    <ScrollReveal>
      <section className="mx-auto w-full max-w-7xl overflow-x-clip px-4 pt-14 pb-10 sm:px-8 md:pt-24 md:pb-14 lg:px-25">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
          {/* ── متن ── */}
          <div className="w-full md:w-[42%]">
            <p className="small-text mb-2 text-secondary">Liora Skincare</p>
            <h2 className="section-title text-dark">
              مجموعه کامل مراقبت از پوست
            </h2>
            <p className="body-text mt-4 text-dark/70">
              با محصولات مراقبت پوستی لیورا، روتین روزانه خود را به تجربه‌ای
              لذت‌بخش تبدیل کنید. فرمولاسیون غنی از ترکیبات مؤثر، پوست را
              عمیقاً آبرسانی میکند.
            </p>
            <button
              type="button"
              className="mt-7 cursor-pointer rounded-full bg-secondary px-8 py-3 text-sm font-bold text-primary transition duration-300 hover:bg-dark active:scale-95"
            >
              مشاهده کاتالوگ
            </button>
          </div>

          {/* ── عکس‌ها — ارتفاع موبایل جمع‌وجورتر ── */}
          <div className="group relative h-52 w-full sm:h-64 md:h-80 lg:h-96">
            <span
              aria-hidden="true"
              className="font-canela pointer-events-none absolute -top-7 right-3 z-30 select-none text-8xl leading-none text-accent drop-shadow-sm sm:-top-10 sm:right-5 sm:text-9xl lg:-top-20 lg:right-6 lg:text-[11rem]"
            >
              new
            </span>

            <img
              src={pic1}
              alt="محصولات مراقبت پوست لیورا"
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full rounded-3xl object-cover transition-all duration-500 ease-out motion-reduce:transition-none ${
                isSwapped ? BACK : FRONT
              }`}
            />
            <img
              src={pic2}
              alt="سرم و کرم آبرسان لیورا"
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full rounded-3xl object-cover transition-all duration-500 ease-out motion-reduce:transition-none ${
                isSwapped ? FRONT : BACK
              }`}
            />

            <button
              type="button"
              onClick={() => setIsSwapped((s) => !s)}
              aria-label="جابه‌جایی تصاویر"
              className="absolute bottom-2 left-2 z-30 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-dark/10 bg-primary text-dark shadow-lg transition-transform duration-300 hover:rotate-180 active:scale-90"
            >
              <FiRefreshCw className="text-lg" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

export default BannerBottom;