import {
  Bell,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link, Outlet, useLocation, useNavigate } from "react-router";

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Customers",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* MOBIL UCHUN QORA FON (Menyu ochilganda orqani xiralashtiradi) */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
        />
      )}

      {/* CHAP TOMON: SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between bg-slate-900 text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo va Mobilda yopish (X) tugmasi */}
          <div className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">
                <ShoppingBag size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Elextra
              </span>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Menyular ro'yxati */}
          <nav className="mt-6 flex flex-col gap-1.5 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              // startsWith: masalan /admin/products/add da ham Products faol turishi uchun
              const isActive = location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Pastki qism: Profil va Chiqish */}
        <div className="border-t border-slate-800 p-4">
          <div className="mb-3 flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-sm font-bold text-white">
              S
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium text-white">
                Sarvarjon
              </p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-slate-800 hover:text-red-300"
          >
            <LogOut size={18} />
            Chiqish
          </button>
        </div>
      </aside>

      {/* O'NG TOMON: HEADER + ASOSIY KONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Yuqori Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8">
          <div className="flex items-center gap-3">
            {/* Mobil Hamburger tugmasi */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            >
              <Menu size={22} />
            </button>
          </div>

          {/* O'ng taraf: Qo'ng'iroqcha va Avatar */}
          <div className="flex items-center gap-4">
            <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
              S
            </div>
          </div>
        </header>

        {/* Ichki sahifalar almashadigan joy */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
