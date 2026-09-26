import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoClose, IoAdd, IoRemove, IoTrashOutline } from "react-icons/io5";
import { useCart } from "../store/cart";
import { formatPrice } from "../../utils/format";
import { useNavigate } from "react-router-dom";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const faNum = new Intl.NumberFormat("fa-IR");

function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCart((s) => s.items);
  const removeItem = useCart((s) => s.removeItem);
  const updateQuantity = useCart((s) => s.updateQuantity);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const navigate = useNavigate();

  // Escape می‌بنده + اسکرول پشت صفحه قفل می‌شه
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

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* پرده‌ی تیره — کلیک روش = بستن */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-60 bg-dark/40 backdrop-blur-[2px]"
          />

          {/* پنل کشویی — از چپ میاد (سمت end در RTL) */}
          <motion.aside
            key="panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "tween",
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            role="dialog"
            aria-modal="true"
            aria-label="سبد خرید"
            className="fixed inset-y-0 left-0 z-70 flex w-[90%] max-w-sm flex-col bg-primary shadow-2xl"
          >
            {/* هدر */}
            <div className="flex items-center justify-between border-b border-dark/10 p-5">
              <h2 className="text-lg font-bold text-dark">
                سبد خرید
                {items.length > 0 && (
                  <span className="mr-2 text-sm font-normal text-dark/50">
                    ({faNum.format(items.length)} محصول)
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="بستن سبد خرید"
                className="cursor-pointer text-2xl text-dark/60 transition hover:text-dark"
              >
                <IoClose />
              </button>
            </div>

            {/* لیست آیتم‌ها یا حالت خالی */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
                <span className="text-6xl text-accent/50" aria-hidden="true">
                  🧺
                </span>
                <p className="text-sm text-dark/60">سبد خریدت خالیه</p>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="rounded-full bg-dark px-8 py-3 text-sm font-bold text-primary transition hover:bg-secondary"
                >
                  شروع خرید
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-5">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-3 border-b border-dark/10 py-4"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 shrink-0 rounded-xl bg-accent object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-bold text-dark">
                            {item.title}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`حذف ${item.title}`}
                            className="cursor-pointer text-lg text-dark/30 transition hover:text-red-500"
                          >
                            <IoTrashOutline />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-dark">
                            {formatPrice(item.price * item.quantity)}
                            <span className="mr-1 text-[10px] font-normal text-dark/50">
                              تومان
                            </span>
                          </p>
                          <div className="flex items-center gap-1 rounded-full border border-dark/15">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              aria-label="افزایش تعداد"
                              className="flex h-8 w-8 cursor-pointer items-center justify-center text-dark transition hover:text-secondary"
                            >
                              <IoAdd />
                            </button>
                            <span className="min-w-5 text-center text-sm font-bold text-dark">
                              {faNum.format(item.quantity)}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              aria-label="کاهش تعداد"
                              className="flex h-8 w-8 cursor-pointer items-center justify-center text-dark transition hover:text-red-500"
                            >
                              <IoRemove />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* فوتر: جمع کل + دکمه پرداخت */}
                <div className="border-t border-dark/10 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-dark/60">جمع کل</span>
                    <span className="text-lg font-bold text-dark">
                      {formatPrice(total)}
                      <span className="mr-1 text-xs font-normal text-dark/50">
                        تومان
                      </span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate("/checkout");
                    }}
                    className="w-full cursor-pointer rounded-full bg-dark py-3.5 text-sm font-bold text-primary transition duration-300 hover:bg-secondary active:scale-[0.98]"
                  >
                    ادامه و پرداخت
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
