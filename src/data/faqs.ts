export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "natural-ingredients",
    question: "ترکیبات طبیعی",
    answer: "استفاده از مواد اولیه باکیفیت برای مراقبت بهتر از پوست",
  },
  {
    id: "gentle-formula",
    question: "فرمولاسیون ملایم",
    answer: "محصولاتی طراحی شده برای حفظ تعادل طبیعی پوست",
  },
  {
    id: "specialized-care",
    question: "مراقبت تخصصی",
    answer: "ترکیب علم و طبیعت برای نتیجه بهتر",
  },
  {
    id: "sustainability",
    question: "پایداری",
    answer: "تولید مسئولانه با توجه به سلامت پوست و محیط زیست",
  },
];