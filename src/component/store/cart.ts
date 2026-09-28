import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../../types/product";

export type CartItem = {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};


export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          // اگه قبلاً تو سبد هست → فقط تعداد +۱
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          // نبود → اضافه‌ش کن
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                image: product.image,
                title: product.subtitle,
                price: product.price,
                quantity: 1,
              },
            ],
          };
        }),

            removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>          // 👈 این بلاک
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) =>
                  i.id === id ? { ...i, quantity } : i
                ),
        })),
      clear: () => set({ items: [] }),
     
    }),
    { name: "liora-cart" } // 👈 کلید localStorage
  )
);