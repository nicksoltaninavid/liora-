import categoryHair from "../assets/category2.webp";
import categoryBody from "../assets/Category1.webp";

export interface Category {
  id: string;
  image: string;
  title: string;       // نام انگلیسی
  descTitle?: string;  // تیتر فارسی (فقط کارت ویژه)
  desc?: string;
  featured?: boolean;
  to:string;
}

export const categories: Category[] = [
 { id: "hair-care", to: "/shop?category=haircare", image: categoryHair, title: "Hair Care" },
{ id: "body-care", to: "/shop?category=bodycare", image: categoryBody, title: "Body Care" },
{ id: "skin-care", to: "/shop?category=skincare", image: categoryBody, title: "SkinCare" },
];