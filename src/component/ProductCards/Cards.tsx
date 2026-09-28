import { memo } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/format";
import { useCart } from "../store/cart";
import { useToasts } from "../store/toast";
import { useWishlist } from "../store/wishlist";

export type CardsProps = {
  product: Product;
};

function Cards({ product }: CardsProps) {
  const addItem = useCart((s) => s.addItem);
  const showToast = useToasts((s) => s.showToast);
  const toggleWishlist = useWishlist((s) => s.toggleWishlist);
  const wished = useWishlist((s) => s.items.some((i) => i.id === product.id));

  const handleAdd = () => {
    addItem(product);
    showToast(`${product.subtitle} به سبد اضافه شد`);
  };

  const handleToggleWish = () => {
    toggleWishlist(product);
    showToast(
      wished
        ? `${product.subtitle} از علاقه‌مندی‌ها حذف شد`
        : `${product.subtitle} به علاقه‌مندی‌ها اضافه شد`
    );
  };

  const { image, title, subtitle, description, price } = product;

  return (
    <article className="group relative flex h-full flex-col text-right transition duration-300 ease-out hover:drop-shadow-lg motion-reduce:transition-none">
      {/* ❤️ قلب — بیرون از لینک، روی گوشه‌ی عکس */}
      <button
        type="button"
        onClick={handleToggleWish}
        aria-label={wished ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        className={`absolute top-3 inset-e-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary/90 shadow-md transition duration-300 active:scale-90 ${
          wished ? "text-red-500" : "text-dark/50"
        }`}
      >
        {wished ? <FaHeart /> : <FaRegHeart />}
      </button>

      <Link
        to={`/product/${product.id}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark"
      >
        <div className="overflow-hidden rounded-xl bg-accent">
          <img
            src={image}
            alt={subtitle}
            loading="lazy"
            decoding="async"
            className="h-44 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 sm:h-52 lg:h-60 xl:h-72 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <div className="mt-2.5 space-y-1">
          <h3 className="text-base font-semibold text-dark sm:text-lg">{title}</h3>
          <p className="text-xs text-dark/60">{subtitle}</p>
          <p className="line-clamp-2 text-xs leading-5 text-dark/70 sm:text-sm sm:leading-6">
            {description}
          </p>
          <p className="pt-0.5 text-lg font-semibold text-dark sm:text-xl">
            {formatPrice(price)}
            <span className="mr-1 text-xs font-normal text-dark/60">تومان</span>
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleAdd}
        className="mt-2.5 flex w-full cursor-pointer items-center justify-center rounded-full border border-dark py-2.5 text-sm font-bold text-dark transition duration-300 hover:bg-dark hover:text-primary active:scale-95 sm:mt-3"
      >
        افزودن به سبد
      </button>
    </article>
  );
}

export default memo(Cards);