import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { useProducts } from "../../hooks/useProducts";
import { formatPrice } from "../../utils/format";

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const { data } = useProducts();
  const products = data ?? [];
    // بستن + پاک‌سازی عبارت جستجو — یه جا، بدون رندر اضافه
  const handleClose = () => {
    setQuery("");
    onClose();
  };

  // Escape می‌بنده + اسکرول پشت قفل می‌شه (همون الگوی CartDrawer)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

 

  // فیلتر زنده از روی کش — بدون هیچ درخواست شبکه‌ای!
  const results = query.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.trim().toLowerCase()) ||
          p.subtitle.includes(query.trim())
      )
    : [];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* پرده‌ی تیره — کلیک = بستن */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[90] bg-dark/40 backdrop-blur-[2px]"
          />

          {/* پنل سرچ — از بالا میاد پایین */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="جستجوی محصولات"
            className="fixed inset-x-4 top-20 z-[95] mx-auto max-w-xl rounded-3xl bg-primary p-4 shadow-2xl sm:top-24"
          >
            {/* فیلد جستجو */}
            <div className="flex items-center gap-3 rounded-full border border-dark/15 bg-white/60 px-4 py-3 transition-colors focus-within:border-secondary">
              <IoSearchOutline className="shrink-0 text-lg text-dark/40" aria-hidden="true" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="نام محصول رو بنویس... مثلاً سرم"
                aria-label="جستجوی محصولات"
                className="w-full bg-transparent text-sm text-dark outline-none placeholder:text-dark/30"
              />
              <button
                type="button"
                onClick={handleClose}
                aria-label="بستن جستجو"
                className="shrink-0 cursor-pointer text-xl text-dark/40 transition hover:text-dark"
              >
                <IoClose />
              </button>
            </div>

            {/* نتایج */}
            <div className="mt-3 max-h-[50vh] overflow-y-auto">
              {/* حالت ۱: هنوز چیزی ننوشته */}
              {query.trim() === "" && (
                <p className="py-8 text-center text-sm text-dark/40">
                  🔍 دنبال چی می‌گردی؟
                </p>
              )}

              {/* حالت ۲: نوشته ولی چیزی پیدا نشد */}
              {query.trim() !== "" && results.length === 0 && (
                <p className="py-8 text-center text-sm text-dark/40">
                  چیزی با این اسم پیدا نشد 🤷‍♂️
                </p>
              )}

              {/* حالت ۳: نتایج */}
              <ul className="space-y-1">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/product/${p.id}`}
                      onClick={handleClose}
                      className="flex items-center gap-3 rounded-2xl p-2 transition duration-200 hover:bg-accent/20"
                    >
                      <img
                        src={p.image}
                        alt={p.subtitle}
                        className="h-14 w-14 shrink-0 rounded-xl bg-accent object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-dark">{p.subtitle}</p>
                        <p className="text-xs text-dark/50">{p.title}</p>
                      </div>
                      <p className="text-sm font-semibold text-dark">
                        {formatPrice(p.price)}
                        <span className="mr-1 text-[10px] font-normal text-dark/50">تومان</span>
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SearchModal;