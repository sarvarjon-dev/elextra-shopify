import { Link, useParams, useRouteLoaderData } from "react-router";
import { type Category } from "../../types";

export const CategoryNav = () => {
  const { slug } = useParams<{ slug?: string }>();
  // Agar URL'da slug bo'lmasa, demak "all" (barchasi) aktiv
  const activeCategory = slug || "all";
  const backendCategories = (useRouteLoaderData("root") as Category[]) || [];

  // Har doim birinchi bo'lib turadigan "All Products" opsiyasi
  const allCategories: Category[] = [
    { id: "all", name: "All Products", slug: "all" },
    ...backendCategories,
  ];
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Gorizontal kategoriyalar menyusi */}
        <nav className="flex items-center gap-8 overflow-x-auto py-3 no-scrollbar">
          {allCategories.map((category) => {
            const isActive = activeCategory === category.slug;
            const path =
              category.slug === "all" ? "/" : `/category/${category.slug}`;
            return (
              <Link
                to={path}
                key={category.id}
                className={`relative whitespace-nowrap text-xs font-medium transition py-1 ${
                  isActive
                    ? "font-bold text-orange-500"
                    : "text-slate-600 hover:text-orange-500"
                }`}
              >
                {category.name}

                {/* Aktiv bo'lganda tagida chiqadigan olovrang chiziq */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-orange-500" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default CategoryNav;
