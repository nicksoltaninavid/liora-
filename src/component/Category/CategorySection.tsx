import { ScrollReveal } from "../ScrollReveal";
import CategoryCard from "./Category";
import { categories } from "../../data/categories";

function CategorySection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 md:py-14 lg:px-25">
      <ScrollReveal>
        <div className="mb-8">
          <p className="small-text text-secondary">Liora Collections</p>
          <h2 className="section-title text-dark">دسته‌بندی محصولات</h2>
        </div>
      </ScrollReveal>

      {/* موبایل: دو ستونه | lg: سه ستونه + ارتفاع ردیف ثابت = تراز تضمینی */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-104 lg:grid-cols-3">
        {categories.map((item, index) => (
          <CategoryCard
            key={item.id}
            {...item}
            delay={index * 0.1}
            className={index === 0 ? "col-span-2 lg:col-span-1" : ""}
          />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;