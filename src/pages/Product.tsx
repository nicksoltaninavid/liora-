import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../utils/format";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../component/store/cart";
import { useToasts } from "../component/store/toast";

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, isError, refetch } = useProducts();
  const addItem = useCart((s) => s.addItem);
  const showToast = useToasts((s) => s.showToast);

  // هوک‌ها اول، return های شرطی بعد — قانون همیشگی
  if (isPending) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-25">
        <div className="mx-auto grid w-full max-w-md animate-pulse gap-4 sm:grid-cols-2 sm:max-w-none">
          <div className="aspect-square rounded-3xl bg-accent/50" />
          <div className="space-y-3">
            <div className="h-4 w-1/3 rounded-full bg-accent/40" />
            <div className="h-8 w-3/4 rounded-full bg-accent/40" />
            <div className="h-4 w-full rounded-full bg-accent/40" />
            <div className="h-4 w-2/3 rounded-full bg-accent/40" />
            <div className="h-12 w-1/2 rounded-full bg-accent/40" />
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="text-5xl" aria-hidden="true">📡</span>
        <p className="text-sm text-dark/60">مشکلی در دریافت محصول پیش آمد</p>
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

  // دیتا اومده — حالا دنبال محصول بگرد
  const product = data?.find((p) => p.id === id);

  if (!product) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="section-title text-dark">محصول پیدا نشد</h1>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-secondary px-8 py-3 text-sm font-bold text-primary transition hover:bg-dark"
        >
          بازگشت به فروشگاه
        </Link>
      </section>
    );
  }

  const handleAdd = () => {
    addItem(product);
    showToast(`${product.subtitle} به سبد اضافه شد`);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-25">
      <div className="grid gap-8 md:grid-cols-2 md:items-center lg:gap-16">
        <div className="mx-auto w-full max-w-72 sm:max-w-80 md:max-w-md">
          <img
            src={product.image}
            alt={product.subtitle}
            className="aspect-square w-full rounded-3xl bg-accent object-cover"
          />
        </div>

        <div>
          <p className="small-text text-secondary">{product.title}</p>
          <h1 className="section-title mt-1 text-dark">{product.subtitle}</h1>
          <p className="body-text mt-4 text-dark/70">{product.description}</p>
          <p className="mt-6 text-3xl font-bold text-dark">
            {formatPrice(product.price)}
            <span className="mr-1 text-sm font-normal text-dark/60">تومان</span>
          </p>

          <button
            type="button"
            onClick={handleAdd}
            className="mt-6 w-full cursor-pointer rounded-full bg-dark px-8 py-3.5 text-sm font-bold text-primary transition duration-300 hover:bg-secondary active:scale-95 sm:w-auto sm:px-12"
          >
            افزودن به سبد خرید
          </button>

          <Link to="/shop" className="mt-4 block text-sm text-dark/50 transition hover:text-dark">
            ← بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;