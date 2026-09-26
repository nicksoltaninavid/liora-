import { ScrollReveal } from "../ScrollReveal";
import { FiArrowLeft } from "react-icons/fi";
import type { Category } from "../../data/categories";
import { Link } from "react-router-dom";

type CategoryCardProps = Category & {
  to: string;
  className?: string;
  delay?: number;
};

function CategoryCard({
  image,
  title,
  desc,
  featured,
  descTitle,
  className,
  delay = 0,
  to,
}: CategoryCardProps) {
  return (
    <ScrollReveal className={className} delay={delay}>
      <Link to={to} className="group block h-full cursor-pointer rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark">
        <div className={featured ? "flex h-full flex-col" : "h-full"}>
          {/* متن کارت ویژه — بالای عکس */}
          {featured && (
            <div className="pb-4 lg:pb-5">
              <h3 className="text-2xl font-bold text-dark sm:text-3xl">
                {descTitle}
              </h3>
              <p className="body-text mt-1.5 line-clamp-2 text-dark/70 sm:line-clamp-3">
                {desc}
              </p>
            </div>
          )}

          {/* عکس */}
          <div
            className={
              featured
                ? "relative min-h-40 flex-1 overflow-hidden rounded-3xl lg:h-auto"
                : "relative h-40 overflow-hidden rounded-3xl sm:h-48 md:h-60 lg:h-full"
            }
          >
            <img
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />

            <div className="absolute inset-0 bg-black/25 transition duration-300 group-hover:bg-black/10" />

            {/* عنوان — فقط کارت‌های ساده (کارت ویژه متنش بالانه) */}
            {!featured && (
              <h3 className="absolute bottom-4 start-4 text-lg font-semibold text-primary sm:text-xl lg:text-2xl">
                {title}
              </h3>
            )}

            {/* فلش hover */}
            <span className="absolute bottom-3 inset-s-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-primary/90 text-dark opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <FiArrowLeft aria-hidden="true" className="text-base" />
            </span>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export default CategoryCard;