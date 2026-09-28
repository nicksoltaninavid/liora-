import { useState } from "react";
import type { FormEvent } from "react";
import { FiInstagram, FiArrowUp } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { RiWhatsappLine } from "react-icons/ri";
import logo from "../../assets/Logo.webp";

const footerLinks = [
  {
    title: "فروشگاه",
    links: [
      { label: "همه محصولات", href: "#products" },
      { label: "مراقبت پوست", href: "#skincare" },
      { label: "مراقبت مو", href: "#haircare" },
      { label: "کاتالوگ", href: "#catalog" },
    ],
  },
  {
    title: "لیورا",
    links: [
      { label: "درباره ما", href: "#about" },
      { label: "بلاگ", href: "#blog" },
      { label: "تماس با ما", href: "#contact" },
    ],
  },
  {
    title: "پشتیبانی",
    links: [
      { label: "سوالات متداول", href: "#faq" },
      { label: "رویه ارسال", href: "#shipping" },
      { label: "بازگشت کالا", href: "#returns" },
      { label: "حریم خصوصی", href: "#privacy" },
    ],
  },
];

const socials = [
  { label: "اینستاگرام", href: "https://instagram.com/", Icon: FiInstagram },
  { label: "تلگرام", href: "https://t.me/", Icon: FaTelegramPlane },
  { label: "واتساپ", href: "https://wa.me/", Icon: RiWhatsappLine },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: اتصال به API خبرنامه
    setSubscribed(true);
    setEmail("");
  };

  const scrollTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const persianYear = new Intl.NumberFormat("fa-IR").format(new Date().getFullYear());

  return (
    <footer className="rounded-t-[2.5rem] bg-dark text-primary">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-25">
        {/* ── برند + خبرنامه ── */}
        <div className="flex flex-col gap-8 border-b border-primary/10 py-10 md:flex-row md:items-center md:justify-between md:py-14">
          <div>
            <img src={logo} alt="لیورا" className="h-12 md:h-14" />
            <p className="small-text mt-3 max-w-xs leading-6 text-primary/60">
              فلسفه‌ای جدید از خودمراقبتی؛ پوست و موی سالم با الهام از طبیعت.
            </p>
          </div>

          <div className="w-full max-w-md">
            <p className="mb-3 text-sm font-bold">عضویت در خبرنامه لیورا</p>
            {subscribed ? (
              <p className="rounded-full border border-accent/40 bg-accent/10 px-5 py-3 text-sm text-accent">
                عضویت شما ثبت شد 🌿 از همراهی‌تان خوشحالیم.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 p-1.5 transition-colors focus-within:border-primary/40"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ایمیل شما"
                  aria-label="ایمیل برای عضویت در خبرنامه"
                  className="w-full bg-transparent px-4 text-sm text-primary placeholder:text-primary/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 cursor-pointer rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-dark transition duration-300 hover:bg-accent active:scale-95"
                >
                  عضویت
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── لینک‌ها ── */}
        <nav
          aria-label="لینک‌های فوتر"
          className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-3 md:py-12"
        >
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-bold text-accent">{group.title}</h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-primary/70 transition-colors duration-300 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* ── نوار پایانی ── */}
        <div className="flex flex-col-reverse items-center justify-between gap-5 border-t border-primary/10 py-6 sm:flex-row">
          <p className="small-text text-primary/50">
            © {persianYear} لیورا — تمامی حقوق محفوظ است.
          </p>

          <div className="flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 text-primary/70 transition duration-300 hover:border-primary hover:bg-primary hover:text-dark"
              >
                <Icon className="text-lg" aria-hidden="true" />
              </a>
            ))}

            <button
              type="button"
              onClick={scrollTop}
              aria-label="بازگشت به بالای صفحه"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-primary/15 text-primary/70 transition duration-300 hover:border-primary hover:bg-primary hover:text-dark active:scale-90"
            >
              <FiArrowUp className="text-lg" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;