import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
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
