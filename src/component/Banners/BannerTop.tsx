// 
import cream from "../../assets/cream.webp";
import { ScrollReveal } from "../ScrollReveal";
import { Link } from "react-router-dom";
 
function BannerTop() {
  return (
    <ScrollReveal>
     <section className="flex min-h-svh w-full flex-col items-center justify-center gap-8 px-4 py-10 sm:px-12 md:flex-row lg:px-24">
        <div className="flex-1 flex justify-center">
          <img src={cream} alt="cream" className="w-full max-w-md h-auto" />
        </div>
 
        <div className="flex-1 text-dark px-2 sm:px-5">
          <h1 className="pt-4 md:pt-10 pb-5 text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold">
            فلسفه ایی جدیداز خودمراقبتی:پوست و موی سالم
          </h1>
          <p className="pb-8 md:pb-10 text-sm sm:text-base leading-7">
            محصولات مراقبت پوستی لیورا با فرمولاسیونی ملایم و ترکیبی از مواد
            اولیه باکیفیت طراحی شده‌اند تا نیازهای روزمره پوست شما را برطرف
            کنند. ما با الهام از طبیعت و استفاده از ترکیبات مؤثر، محصولاتی را
            ارائه می‌کنیم که به آبرسانی، تغذیه و حفظ شادابی پوست کمک می‌کنند.
          </p>
         <Link
  to="/shop"
  className="inline-block cursor-pointer rounded-full bg-secondary px-8 py-3 text-sm font-bold text-primary transition duration-300 hover:bg-dark active:scale-95"
>
            مشاهده محصولات لیورا
          </Link>
        </div>
      </section>
    </ScrollReveal>
  );
}
export default BannerTop;