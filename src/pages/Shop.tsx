import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import type { ProductCategory } from "../types/product"; // 👈 جدید
import { useProducts } from "../hooks/useProducts";
import { formatPrice } from "../utils/format";

const categoryFilters: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "skincare", label: "مراقبت پوست" },
  { value: "haircare", label: "مراقبت مو" },
  { value: "bodycare", label: "مراقبت بدن" },
];

const fa = new Intl.NumberFormat("fa-IR");

function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL تنها منبع حقیقت — هیچ useState ای برای فیلتر نداریم
  const category = searchParams.get("category") ?? "all";
  const sort = searchParams.get("sort") ?? "default";

  // اضافه/حذف هوشمند پارامتر: مقدار پیش‌فرض → از URL پاک می‌شه (URL تمیز می‌مونه)
  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === "all" || value === "default") next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };
const { data, isPending, isError, refetch } = useProducts();
const products = data ?? [];
  // استنتاج به‌جای ذخیره: هر رندر از روی URL محاسبه می‌شه
  const filtered = useMemo(() => {
    const list =
      category === "all"
        ? products
        : products.filter((p) => p.category === category);
    if (sort === "cheap") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "expensive")
      return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, sort, products]);

  // ۱) لودینگ — اسکلتون به‌جای اسپینر
if (isPending) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-25">
      <p className="small-text text-secondary">Liora Shop</p>
      <h1 className="section-title text-dark">همه‌ی محصولات</h1>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-3xl bg-white/60 p-3">
            <div className="aspect-square rounded-2xl bg-accent/50" />
            <div className="mt-3 h-4 w-3/4 rounded-full bg-accent/40" />
            <div className="mt-2 h-3 w-1/2 rounded-full bg-accent/40" />
            <div className="mt-2 h-5 w-1/3 rounded-full bg-accent/40" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ۲) ارور — با دکمه‌ی تلاش مجدد
if (isError) {
  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="text-5xl" aria-hidden="true">📡</span>
      <p className="text-sm text-dark/60">مشکلی در دریافت محصولات پیش آمد</p>
      <button
        type="button"
        onClick={() => refetch()}
        className="cursor-pointer rounded-full bg-dark px-8 py-3 text-sm font-bold text-primary transition hover:bg-secondary active:scale-95"
      >
        تلاش مجدد
      </button>
    </section>
  );
}

// ۳) موفقیت → همون return اصلی قبلی

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-25">
      <p className="small-text text-secondary">Liora Shop</p>
      <h1 className="section-title text-dark">همه‌ی محصولات</h1>

      {/* ── فیلترها ── */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((c) => {
            const active = category === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setParam("category", c.value)}
                className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-bold transition duration-300 active:scale-95 ${
                  active
                    ? "bg-dark text-primary"
                    : "border border-dark/20 text-dark hover:border-dark"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setParam("sort", e.target.value)}
            aria-label="ترتیب نمایش"
            className="cursor-pointer appearance-none rounded-full border border-dark/20 bg-transparent py-2.5 pl-10 pr-5 text-sm font-bold text-dark outline-none transition hover:border-dark focus-visible:outline-2 focus-visible:outline-dark"
          >
            <option value="default">جدیدترین</option>
            <option value="cheap">ارزان‌ترین</option>
            <option value="expensive">گران‌ترین</option>
          </select>
          <FiChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark"
          />
        </div>
      </div>

      <p className="small-text mt-4 text-dark/50">
        {fa.format(filtered.length)} محصول
      </p>

      {/* ── گرید یا حالت خالی ── */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="group rounded-3xl bg-white/60 p-3 transition duration-300 hover:shadow-lg"
            >
              <div className="overflow-hidden rounded-2xl bg-accent">
                <img
                  src={p.image}
                  alt={p.subtitle}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h2 className="card-title mt-3 text-dark">{p.subtitle}</h2>
              <p className="small-text text-dark/50">{p.title}</p>
              <p className="mt-1 font-bold text-dark">
                {formatPrice(p.price)}
                <span className="mr-1 text-xs font-normal">تومان</span>
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-white/60 py-16 text-center">
          <span className="text-5xl" aria-hidden="true">
            🔍
          </span>
          <p className="text-sm text-dark/60">
            محصولی در این دسته‌بندی پیدا نشد
          </p>
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className="cursor-pointer rounded-full bg-dark px-8 py-3 text-sm font-bold text-primary transition hover:bg-secondary active:scale-95"
          >
            نمایش همه‌ی محصولات
          </button>
        </div>
      )}
    </section>
  );
}

export default ShopPage;
