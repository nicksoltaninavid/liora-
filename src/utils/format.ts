// src/utils/format.ts
export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("fa-IR").format(price);
// خروجی: ۴۵۰٬۰۰۰