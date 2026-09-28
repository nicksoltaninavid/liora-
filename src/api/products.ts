import type { Product } from "../types/product";
import { fetchProductsFromServer } from "./mockServer";

export function fetchProducts(): Promise<Product[]> {
  return fetchProductsFromServer();
}