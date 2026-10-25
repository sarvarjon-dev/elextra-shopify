import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CategoryNav from "../components/layout/CategoryNav";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <CategoryNav />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
