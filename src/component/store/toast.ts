import { create } from "zustand";

export type Toast = {
  id: number;
  message: string;
};

type ToastState = {
  toasts: Toast[];
  showToast: (message: string) => void;
  dismiss: (id: number) => void;
};

export const useToasts = create<ToastState>((set) => ({
  toasts: [],
  showToast: (message) => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message }] }));
    // بعد ۳ ثانیه خودش پاک می‌شه
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3000);
  },
  dismiss: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));