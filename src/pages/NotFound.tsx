import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-canela select-none text-[8rem] leading-none text-accent/50 sm:text-[10rem]" aria-hidden="true">
        404
      </p>
      <h1 className="mt-2 text-xl font-bold text-dark sm:text-2xl">
        صفحه‌ای که دنبالش بودی پیدا نشد
      </h1>
      <Link
        to="/"
        className="mt-6 rounded-full bg-secondary px-8 py-3 text-sm font-bold text-primary transition hover:bg-dark active:scale-95"
      >
        بازگشت به خانه
      </Link>
    </section>
  );
}

export default NotFoundPage;