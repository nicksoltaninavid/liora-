import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],  // کلید کش — هر جا با همین کلید صدا زده شه، همون کش
    queryFn: fetchProducts,  // تابعی که دیتا رو میاره
  });
}