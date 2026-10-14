import { useNavigate, useParams } from "react-router";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const categories: Category[] = [
  { id: "all", name: "All Products", slug: "all" },
  { id: "1", name: "Laptops & Computers", slug: "laptops" },
  { id: "2", name: "Smartphones", slug: "smartphones" },
  { id: "3", name: "Headphones & Audio", slug: "audio" },
  { id: "4", name: "Gaming & Consoles", slug: "gaming" },
  { id: "5", name: "Cameras", slug: "cameras" },
  { id: "6", name: "Watches & Trackers", slug: "watches" },
  { id: "7", name: "Accessories", slug: "accessories" },
];

export const CategoryNav = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();

  // Agar URL'da slug bo'lmasa, demak "all" (barchasi) aktiv
  const activeCategory = slug || "all";

  const handleCategoryClick = (catSlug: string) => {
    if (catSlug === "all") {
      navigate("/");
    } else {
      navigate(`/category/${catSlug}`);
    }
  };

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Gorizontal kategoriyalar menyusi */}
        <nav className="flex items-center gap-8 overflow-x-auto py-3 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.slug)}
                className={`relative whitespace-nowrap text-xs font-medium transition py-1 ${
                  isActive
                    ? "font-bold text-orange-500"
                    : "text-slate-600 hover:text-orange-500"
                }`}
              >
                {cat.name}

                {/* Aktiv bo'lganda tagida chiqadigan olovrang chiziq */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-orange-500" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default CategoryNav;
