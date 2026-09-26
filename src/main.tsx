import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { router } from "./router";

// یه نمونه‌ی سراسری از کلاینت — تنظیماتش برای کل اپ اعمال می‌شه
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,      // دیتا تا ۱ دقیقه «تازه» حساب می‌شه → هیچ fetch تکراری
      retry: 1,               // اگه fetch شکست خورد، یه بار خودش دوباره امتحان می‌کنه
      refetchOnWindowFocus: false, // برگشتن به تب مرورگر → fetch مجدد نکن (برای دمو آروم‌تر)
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);