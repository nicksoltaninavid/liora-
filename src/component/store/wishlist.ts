import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../../types/product";

type WishlistState = {
  items: Product[];
  toggleWishlist: (product: Product) => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === product.id);
          return {
            items: exists
              ? state.items.filter((i) => i.id !== product.id)
              : [...state.items, product],
          };
        }),
    }),
    { name: "liora-wishlist" }
  )
);
