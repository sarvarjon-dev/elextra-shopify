import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "./pages/Home";
import CategoryPage, { categoryLoader } from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import { AuthProvider } from "./context/AuthContext";
import RootLayout from "./layouts/RootLayout";
import { getCategories } from "./loaders/categoryLoader";
import { productDetailLoader } from "./loaders/productLoader";
import { CartProvider } from "./context/CartContext";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import AdminLayout from "./components/layout/AdminLayout";
import ProductFormPage from "./pages/admin/ProductFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: getCategories,
    id: "root",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/category/:slug",
        element: <CategoryPage />,
        loader: categoryLoader,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
        loader: productDetailLoader,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />, // Boya yaratgan Admin menyu o'ramimiz
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      // E'tibor bering, bu yerda "dashboard" deb yozilsa, URL "/admin/dashboard" bo'ladi
      {
        path: "dashboard",
        element: (
          <div className="text-2xl font-bold">Admin Dashboard Sahifasi</div>
        ),
      },
      { path: "products/add", element: <ProductFormPage /> },
      {
        path: "orders",
        element: (
          <div className="text-2xl font-bold">Barcha Buyurtmalar Sahifasi</div>
        ),
      },
      {
        path: "products",
        element: (
          <div className="text-2xl font-bold">Mahsulotlarni Boshqarish</div>
        ),
      },
      {
        path: "users",
        element: <div className="text-2xl font-bold">Mijozlar Ro'yxati</div>,
      },
      {
        path: "settings",
        element: <div className="text-2xl font-bold">Sozlamalar Sahifasi</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
