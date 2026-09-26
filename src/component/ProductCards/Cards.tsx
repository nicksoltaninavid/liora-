import { memo } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../data/products";
import { formatPrice } from "../../utils/format";
import { useCart } from "../store/cart";
import { useToasts } from "../store/toast";

export type CardsProps = {
  product: Product;
};

function Cards({ product }: CardsProps) {
  const addItem = useCart((s) => s.addItem);
  const showToast = useToasts((s) => s.showToast);

  const handleAdd = () => {
    addItem(product);
    showToast(`${product.subtitle} به سبد اضافه شد`);
  };

  const { image, title, subtitle, description, price } = product;

  return (
    <article className="px-10 group flex h-full flex-col text-right transition duration-300 ease-out hover:drop-shadow-lg motion-reduce:transition-none">
      <Link
        to={`/product/${product.id}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark"
      >
        {/* 👈 عکس اول — الگوی استاندارد کارت محصول */}
        <div className="overflow-hidden rounded-xl bg-accent">
          <img
            src={image}
            alt={subtitle}
            loading="lazy"
            decoding="async"
            className="h-50 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 sm:h-52 lg:h-60 xl:h-72 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        {/* 👈 متن‌ها: فاصله‌ها جمع شد — space-y-1 به‌جای mt های پراکنده */}
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