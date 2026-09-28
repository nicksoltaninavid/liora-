import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import logo from "../../assets/Logo.webp";
import logoDark from "../../assets/logo2.webp";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../store/cart";
import CartDrawer from "../Cart/CartDrawer";
import { FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../store/wishlist";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";

  // گوش دادن به اسکرول — passive یعنی مرورگر منتظر ما نمی‌مونه (پرفورمنس)
  useEffect(() => {
    const onScroll = () => {
      // تو خانه: تا هیرو تقریباً تموم نشده شیشه‌ای بمون؛ بقیه صفحات: زودتر
      const limit = isHome ? window.innerHeight - 160 : 80;
      setScrolled(window.scrollY > limit);
    };
    onScroll(); // موقع ورود به هر صفحه، وضعیت اولیه درست باشه
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // استنتاج: دو تا state جدا نگه نمی‌داریم، از روی دیتای موجود حساب می‌کنیم
  const onImage = isHome && !scrolled;

  const count = useCart((s) =>
    s.items.reduce((total, item) => total + item.quantity, 0),
  );
  const wishCount = useWishlist((s) => s.items.length);
  const navLinks = [
    { label: "Skincare", to: "/shop?category=skincare" },
    { label: "Hair & Body", to: "/shop?category=haircare" },
    { label: "Catalog", to: "/shop" },
    { label: "About Us", to: "/about" },
    { label: "Blog", to: "/about" },
  ];

  // 👇 فقط منوی همبرگری — Home اول لیست
  const mobileLinks = [{ label: "Home", to: "/" }, ...navLinks];

  // کلاس‌های حالت‌دار — یک بار تعریف، چند بار استفاده
  const barCls = onImage
    ? "border-white/40 bg-white/20 backdrop-blur-xs text-white"
    : "border-dark/10 bg-primary/90 text-dark shadow-lg backdrop-blur-md";

  const hoverCls = onImage ? "hover:text-dark" : "hover:text-secondary";
  const activeCls = onImage
    ? "font-bold text-dark"
    : "font-bold text-secondary";

  const menuCls = onImage
    ? "border-white/40 bg-white/20 text-white backdrop-blur-xl"
    : "border-dark/10 bg-primary/95 text-dark shadow-xl backdrop-blur-xl";
  const logoSrc = onImage ? logo : logoDark;
  return (
    <>
      <nav
        className={`sticky top-4 z-50 mx-auto flex w-[90%] max-w-7xl items-center justify-between rounded-3xl border transition-colors duration-300 ${barCls}`}
      >
        <div className="flex items-center gap-4 pr-6">
          <Link
            to="/wishlist"
            aria-label="علاقه‌مندی‌ها"
            className={`relative text-2xl duration-300 md:text-3xl ${hoverCls}`}
          >
            <FaRegHeart />
            {wishCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-dark px-1 text-xs font-bold text-primary">
                {new Intl.NumberFormat("fa-IR").format(wishCount)}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className={`relative cursor-pointer text-2xl duration-300 md:text-3xl ${hoverCls}`}
          >
            <FaCartShopping />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-dark px-1 text-xs font-bold text-primary">
                {new Intl.NumberFormat("fa-IR").format(count)}
              </span>
            )}
          </button>
        </div>

        <ul className="hidden items-center gap-10 font-light lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className={`duration-300 ${hoverCls} ${
                  location.pathname + location.search === link.to
                    ? activeCls
                    : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/"
          aria-label="لیورا — صفحه اصلی"
          className="transition-opacity duration-300 hover:opacity-80"
        >
          <img
            src={logoSrc}
            alt="Liora Logo"
            className="h-12 md:h-16 lg:h-20"
          />
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={isOpen}
          className={`lg:hidden cursor-pointer text-3xl duration-300 md:text-4xl pl-6 ${hoverCls}`}
        >
          {isOpen ? <IoClose /> : <HiOutlineBars3 />}
        </button>

        {/* 👇 منو حالا داخل nav ئه — top-full یعنی «زیر خود نوبار»، هرجا که باشی */}
        {isOpen && (
          <div
            className={`absolute left-1/2 top-full z-10 mt-3 w-full -translate-x-1/2 rounded-3xl border lg:hidden ${menuCls}`}
          >
            <ul className="flex flex-col items-center gap-4 py-10 font-light sm:gap-6">
              {mobileLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`duration-300 ${hoverCls} ${
                      location.pathname + location.search === link.to
                        ? activeCls
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Navbar;
