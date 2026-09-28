import { Link } from "react-router-dom";
import Cards from "../component/ProductCards/Cards";
import { useWishlist } from "../component/store/wishlist";

function WishlistPage() {
  const items = useWishlist((s) => s.items);

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="text-6xl" aria-hidden="true">🤍</span>
        <h1 className="text-xl font-bold text-dark">
          هنوز چیزی به علاقه‌مندی‌هات اضافه نکردی
        </h1>
        <Link
          to="/shop"
          className="rounded-full bg-dark px-8 py-3 text-sm font-bold text-primary transition hover:bg-secondary active:scale-95"
        >
          رفتن به فروشگاه
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 lg:px-25">
      <p className="small-text text-secondary">Liora Wishlist</p>
      <h1 className="section-title text-dark">علاقه‌مندی‌های من</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <Cards key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default WishlistPage;