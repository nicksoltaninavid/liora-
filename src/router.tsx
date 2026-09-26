/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./component/Layout/RootLayout";
import HomePage from "./pages/Home";

// 👇 lazy یعنی: این صفحه فقط وقتی که کاربر واقعاً رفت بهش، دانلود بشه
const ShopPage = lazy(() => import("./pages/Shop"));
const ProductPage = lazy(() => import("./pages/Product"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const AboutPage = lazy(() => import("./pages/About"));

// تا صفحه lazy لود بشه، این اسپینر نمایش داده می‌شه
const pageFallback = (
  <div className="flex min-h-[60vh] items-center justify-center">
    <span className="h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-dark" />
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // 👈 قالب والد
    children: [
      // 👈 بچه‌ها داخلش رندر می‌شن (درس ۴)
      { index: true, element: <HomePage /> }, // index = دقیقاً "/"
      {
        path: "shop",
        element: (
          <Suspense fallback={pageFallback}>
            <ShopPage />
          </Suspense>
        ),
      },
      {
        path: "product/:id", // 👈 :id یه پارامتر داینامیکئ (درس ۷)
        element: (
          <Suspense fallback={pageFallback}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={pageFallback}>
            <CheckoutPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={pageFallback}>
            <NotFoundPage />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={pageFallback}>
            <AboutPage />
          </Suspense>
        ),
      },
    ],
  },
]);
