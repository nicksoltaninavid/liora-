export type ProductCategory = "skincare" | "haircare" | "bodycare";

export interface Product {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  category: ProductCategory;
}