import type { Product } from "../types/product";

const NETWORK_DELAY = 800; // میلی‌ثانیه — حس اینترنت واقعی

// ۱۰٪ درخواست‌ها شکست می‌خورن → برای دیدن حالت ارور
const shouldFail = () => Math.random() < 0.1;

export function fetchProductsFromServer(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) {
        reject(new Error("خطای شبکه — لطفاً دوباره تلاش کنید"));
        return;
      }
      resolve(productsMock);
    }, NETWORK_DELAY);
  });
}

// داده‌های Mock — بعداً حذفش می‌کنیم
import product1 from "../assets/1-1.webp";
import product2 from "../assets/4-4.webp";
import product3 from "../assets/3-3.webp";
import product4 from "../assets/2-2.webp";
import product5 from "../assets/5-5.webp";

const productsMock: Product[] = [
  { id: "eye-cream", image: product1, title: "Eye Cream", subtitle: "کرم دور چشم", description: "کرمی سبک و مؤثر که به کاهش تیرگی، پف و خطوط ریز اطراف چشم کمک میکند.", price: 450_000, category: "skincare" },
  { id: "cream-cleanser", image: product2, title: "Cream Cleanser", subtitle: "پاک‌کننده کرمی", description: "پاک‌کننده‌ای ملایم که بدون ایجاد خشکی، آلودگی‌ها و چربی اضافی پوست را از بین می‌برد.", price: 620_000, category: "skincare" },
  { id: "moisture-cream", image: product3, title: "Moisture Cream", subtitle: "کرم مرطوب‌کننده", description: "کرمی مغذی برای حفظ رطوبت طبیعی پوست که از خشکی جلوگیری میکند.", price: 540_000, category: "skincare" },
  { id: "double-serum", image: product4, title: "Double Serum", subtitle: "سرم جوان‌ساز", description: "سرمی غنی با ترکیبات مؤثر که به افزایش شفافیت، استحکام و طراوت پوست کمک کرده.", price: 780_000, category: "skincare" },
  { id: "hyaluronic-serum", image: product5, title: "Hyaluronic Serum", subtitle: "سرم هیالورونیک اسید", description: "آبرسانی عمیق با فرمولی سبک که رطوبت را در لایه‌های پوست حفظ میکند.", price: 890_000, category: "skincare" },
  { id: "hair-mask", image: product3, title: "Hair Mask", subtitle: "ماسک مغذی مو", description: "ماسکی غنی برای بازسازی و درخشندگی موهای خشک و آسیب‌دیده.", price: 390_000, category: "haircare" },
  { id: "body-lotion", image: product1, title: "Body Lotion", subtitle: "لوسیون بدن", description: "لوسیونی سبک با جذب سریع برای نرمی و آبرسانی روزانه‌ی پوست بدن.", price: 320_000, category: "bodycare" },
];