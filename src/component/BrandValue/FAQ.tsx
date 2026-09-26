import { ScrollReveal } from "../ScrollReveal";
import FAQItem from "./FAQItem";
import { faqs } from "../../data/faqs";
import faqImage from "../../assets/FAQ.webp";

// اسکیمای FAQPage → ستاره‌دار شدن در نتایج گوگل ⭐
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

function FAQ() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 md:py-14 lg:px-25">
      <ScrollReveal>
        <div className="mb-8 text-center md:mb-10">
          <p className="small-text text-secondary">Why Liora</p>
          <h2 className="section-title text-dark">چرا لیورا؟</h2>
        </div>
      </ScrollReveal>

      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
        {/* آکاردئون‌ها با ورود پلکانی */}
        <div className="w-full max-w-2xl border-t border-dark/15 lg:mx-0 lg:flex-1">
          {faqs.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.07}>
              <FAQItem question={item.question} answer={item.answer} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="hidden w-full max-w-sm shrink-0 lg:block" delay={0.2}>
          <img
            src={faqImage}
            alt="محصولات مراقبتی لیورا"
            loading="lazy"
            decoding="async"
            className="w-full rounded-3xl object-cover"
          />
        </ScrollReveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}

export default FAQ;