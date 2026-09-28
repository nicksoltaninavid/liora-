import { ScrollReveal } from "../component/ScrollReveal";
import { Link } from "react-router-dom";
import { values } from "../data/values";
import faqImage from "../assets/FAQ.webp";

function AboutPage() {
  return (
    <>
      {/* ── هیرو ── */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-16 pb-10 text-center sm:px-8 lg:px-25">
        <ScrollReveal>
          <p className="small-text text-secondary">About Liora</p>
          <h1 className="section-title text-dark">داستان لیورا</h1>
          <p className="body-text mx-auto mt-4 max-w-2xl text-dark/70">
            لیورا با یک باور ساده شروع شد: مراقبت از پوست نباید پیچیده باشه.
            ما ترکیب طبیعت و علم را برای ساختن محصولاتی به کار گرفتیم که هر
            روز، حس خوب بودن را به روتین شما می‌آورند.
          </p>
        </ScrollReveal>
      </section>

      {/* ── فلسفه: عکس + متن ── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-25">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12 lg:gap-16">
          <ScrollReveal className="w-full md:w-1/2">
            <img
              src={faqImage}
              alt="محصولات مراقبتی لیورا"
              loading="lazy"
              decoding="async"
              className="aspect-4/3 w-full rounded-3xl object-cover"
            />
          </ScrollReveal>

          <ScrollReveal className="w-full md:w-1/2" delay={0.15}>
            <p className="small-text mb-2 text-secondary">Our Philosophy</p>
            <h2 className="section-title text-dark">
              طبیعت و علم، کنار هم
            </h2>
            <p className="body-text mt-4 text-dark/70">
              ما باور داریم پوست سالم نتیجه‌ی تعادل است؛ نه تعداد محصولات.
              فرمولاسیون‌های لیورا با حداقل ترکیبات لازم و حداکثر اثر طراحی
              می‌شوند تا پوست شما همان چیزی را بگیرد که واقعاً نیاز دارد.
            </p>
            <p className="body-text mt-3 text-dark/70">
              هر محصول قبل از رسیدن به دست شما، تست پایداری و ایمنی را با
              دقت پشت سر می‌گذارد — چون اعتماد شما سرمایه‌ی ماست.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ارزش‌ها ── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-25">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <p className="small-text text-secondary">Our Values</p>
            <h2 className="section-title text-dark">ارزش‌های ما</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {values.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.1}>
              <div className="h-full rounded-3xl bg-white/60 p-5 text-center sm:p-6">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/30 text-secondary">
                  <item.Icon className="text-2xl" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold text-dark sm:text-lg">
                  {item.title}
                </h3>
                <p className="small-text mt-2 text-dark/60">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-6 pb-16 text-center sm:px-8 lg:px-25">
        <ScrollReveal>
          <Link
            to="/shop"
            className="inline-block cursor-pointer rounded-full bg-secondary px-10 py-3.5 text-sm font-bold text-primary transition duration-300 hover:bg-dark active:scale-95"
          >
            مشاهده‌ی محصولات لیورا
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}

export default AboutPage;