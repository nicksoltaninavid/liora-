import { useId, useState } from "react";
import { IoAdd } from "react-icons/io5";

type FAQItemProps = {
  question: string;
  answer: string;
};

function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const id = useId(); // آیدی یکتا برای اتصال aria

  return (
    <div className="border-b border-dark/15">
      {/* الگوی استاندارد آکاردئون: h3 دور button */}
      <h3>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-start transition-colors duration-300 hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark"
        >
          <span className="text-lg font-medium text-dark sm:text-xl">
            {question}
          </span>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xl transition-all duration-300 ${
              open
                ? "rotate-45 border-dark bg-dark text-primary"
                : "border-dark/20 text-dark"
            }`}
          >
            <IoAdd aria-hidden="true" />
          </span>
        </button>
      </h3>

      {/* ترفند grid-rows: انیمیشن نرم باز/بسته بدون هیچ کتابخانه‌ای */}
      <div
        id={`${id}-panel`}
        role="region"
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-7 text-dark/70">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default FAQItem;