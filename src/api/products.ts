import type { Product } from "../data/products";
import { fetchProductsFromServer } from "./mockServer";

export function fetchProducts(): Promise<Product[]> {
  return fetchProductsFromServer();
}