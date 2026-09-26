import { useState, type ReactNode } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useCart } from "../component/store/cart";
import { formatPrice } from "../utils/format";   // 👈 یادت نره، قبلاً پاک شده بود

const fa = new Intl.NumberFormat("fa-IR");

// ۰۹۱۲... → 0912... (الان فقط اینجا استفاده می‌شه، نه تو schema)
const normalizeDigits = (value: unknown) =>
  String(value ?? "")
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

// ساده — ورودی و خروجی هر دو string
const schema = z.object({
  fullName: z.string().min(3, "نام و نام خانوادگی حداقل ۳ حرف"),
  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثل 09123456789)"),
  city: z.string().min(2, "نام شهر را وارد کنید"),
  address: z.string().min(10, "آدرس کامل‌تری وارد کنید"),
  postalCode: z.string().regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد"),
});

type FormData = z.infer<typeof schema>;

const inputCls =
  "w-full rounded-2xl border border-dark/15 bg-white/60 px-4 py-3 text-sm text-dark outline-none transition placeholder:text-dark/30 focus:border-secondary";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-dark">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [orderCode, setOrderCode] = useState<number | null>(null); // 👈 جدید

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  if (placed) {
    return (
      <section className="mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center">
        <IoCheckmarkCircleOutline className="text-7xl text-secondary" aria-hidden="true" />
        <h1 className="section-title text-dark">سفارش شما ثبت شد!</h1>
        <p className="body-text text-dark/70">
          کد پیگیری:{" "}
          <span className="font-bold text-dark">
            {orderCode !== null ? fa.format(orderCode) : ""}
          </span>
        </p>
        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="mt-4 cursor-pointer rounded-full bg-dark px-8 py-3 text-sm font-bold text-primary transition hover:bg-secondary active:scale-95"
        >
          ادامه خرید
        </button>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="text-6xl" aria-hidden="true">🧺</span>
        <h1 className="text-xl font-bold text-dark">سبد خریدت خالیه</h1>
        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="cursor-pointer rounded-full bg-dark px-8 py-3 text-sm font-bold text-primary transition hover:bg-secondary"
        >
          رفتن به فروشگاه
        </button>
      </section>
    );
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line react-hooks/purity
    setOrderCode(Date.now() % 1_000_000); // 👈 اینجا قانونیه، نه موقع رندر
    console.log("سفارش:", data);
    clear();
    setPlaced(true);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-25">
      <h1 className="section-title mb-8 text-dark">تسویه حساب</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5 rounded-3xl bg-white/60 p-5 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="نام و نام خانوادگی" error={errors.fullName?.message}>
              <input {...register("fullName")} className={inputCls} placeholder="مثلاً سارا محمدی" />
            </Field>
            <Field label="شماره موبایل" error={errors.phone?.message}>
              <input {...register("phone", { setValueAs: normalizeDigits })} inputMode="tel" className={inputCls} placeholder="09123456789" />
            </Field>
            <Field label="شهر" error={errors.city?.message}>
              <input {...register("city")} className={inputCls} placeholder="مثلاً تهران" />
            </Field>
            <Field label="کد پستی" error={errors.postalCode?.message}>
              <input {...register("postalCode", { setValueAs: normalizeDigits })} inputMode="numeric" className={inputCls} placeholder="۱۲۳۴۵۶۷۸۹۰" />
            </Field>
          </div>

          <Field label="آدرس کامل" error={errors.address?.message}>
            <textarea
              {...register("address")}
              rows={3}
              className={`${inputCls} resize-none`}
              placeholder="خیابان، کوچه، پلاک، واحد"
            />
          </Field>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-dark py-3.5 text-sm font-bold text-primary transition duration-300 hover:bg-secondary active:scale-[0.98] sm:w-auto sm:px-12"
          >
            ثبت نهایی سفارش
          </button>
        </form>

        <aside className="h-fit rounded-3xl bg-white/60 p-5 sm:p-8 lg:sticky lg:top-24">
          <h2 className="mb-4 text-lg font-bold text-dark">خلاصه سفارش</h2>
          <ul className="space-y-3 border-b border-dark/10 pb-4">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-3">
                <img src={i.image} alt={i.title} className="h-14 w-14 rounded-xl bg-accent object-cover" />
                <div className="flex-1 text-sm">
                  <p className="font-bold text-dark">{i.title}</p>
                  <p className="text-dark/50">{fa.format(i.quantity)} عدد</p>
                </div>
                <p className="text-sm font-semibold text-dark">{formatPrice(i.price * i.quantity)}</p>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between py-4 text-sm">
            <span className="text-dark/60">ارسال</span>
            <span className="font-bold text-secondary">رایگان 🌿</span>
          </div>
          <div className="flex items-center justify-between border-t border-dark/10 pt-4">
            <span className="text-sm text-dark/60">جمع کل</span>
            <span className="text-lg font-bold text-dark">
              {formatPrice(total)}
              <span className="mr-1 text-xs font-normal text-dark/50">تومان</span>
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CheckoutPage;