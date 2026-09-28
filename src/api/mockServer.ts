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
import product6 from "../assets/Vitamin_C.webp";
import product7 from "../assets/Radiant_Glow_Serum.webp";
import product8 from "../assets/Nourishing_Hair.webp";
import product9 from "../assets/Gentle_Shampoo.webp";
import product10 from "../assets/Sugar_Body_Scrub.webp";

const productsMock: Product[] = [
  { id: "eye-cream", image: product1, title: "Eye Cream", subtitle: "کرم دور چشم", description: "کرمی سبک و مؤثر که به کاهش تیرگی، پف و خطوط ریز اطراف چشم کمک میکند.", price: 450_000, category: "skincare" },
  { id: "cream-cleanser", image: product2, title: "Cream Cleanser", subtitle: "پاک‌کننده کرمی", description: "پاک‌کننده‌ای ملایم که بدون ایجاد خشکی، آلودگی‌ها و چربی اضافی پوست را از بین می‌برد.", price: 620_000, category: "skincare" },
  { id: "moisture-cream", image: product3, title: "Moisture Cream", subtitle: "کرم مرطوب‌کننده", description: "کرمی مغذی برای حفظ رطوبت طبیعی پوست که از خشکی جلوگیری میکند.", price: 540_000, category: "skincare" },
  { id: "double-serum", image: product4, title: "Double Serum", subtitle: "سرم جوان‌ساز", description: "سرمی غنی با ترکیبات مؤثر که به افزایش شفافیت، استحکام و طراوت پوست کمک کرده.", price: 780_000, category: "skincare" },
  { id: "hyaluronic-serum", image: product5, title: "Hyaluronic Serum", subtitle: "سرم هیالورونیک اسید", description: "آبرسانی عمیق با فرمولی سبک که رطوبت را در لایه‌های پوست حفظ میکند.", price: 890_000, category: "skincare" },
  { id: "hair-mask", image: product3, title: "Hair Mask", subtitle: "ماسک مغذی مو", description: "ماسکی غنی برای بازسازی و درخشندگی موهای خشک و آسیب‌دیده.", price: 390_000, category: "haircare" },
  { id: "body-lotion", image: product1, title: "Body Lotion", subtitle: "لوسیون بدن", description: "لوسیونی سبک با جذب سریع برای نرمی و آبرسانی روزانه‌ی پوست بدن.", price: 320_000, category: "bodycare" },
  { id: "vitamin-c-serum", image: product6, title: "Vitamin C Serum", subtitle: "سرم ویتامین C", description: "سرم آنتی‌اکسیدان قوی برای روشن‌سازی پوست و محو کردن لک و تیرگی.", price: 950_000, category: "skincare" },
  { id: "Radiant_Glow_Serum", image: product7, title: "Radiant Glow Serum", subtitle: "سرم روشن‌پوست", description: "سرمی با ترکیبات مؤثر برای افزایش روشنی و سلامت پوست.", price: 1_200_000, category: "skincare" },
  { id: "hair-oil", image: product8, title: "Nourishing Hair Oil", subtitle: "روغن مغذی مو", description: "ترکیبی از روغن‌های طبیعی برای تقویت ریشه، کاهش وز و درخشندگی مو.", price: 410_000, category: "haircare" },
  { id: "shampoo", image: product9, title: "Gentle Shampoo", subtitle: "شامپو ملایم", description: "شامپوی بدون سولفات برای شست‌وشوی لطیف و حفظ رطوبت طبیعی مو.", price: 280_000, category: "haircare" },
  { id: "body-scrub", image: product10, title: "Sugar Body Scrub", subtitle: "اسکراب شکر بدن", description: "اسکرابی لطیف با دانه‌های شکر و روغن بادام برای لایه‌برداری و نرمی پوست.", price: 350_000, category: "bodycare" },
];