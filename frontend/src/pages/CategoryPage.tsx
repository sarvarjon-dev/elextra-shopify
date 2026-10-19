import Navbar from "../components/layout/Navbar";
import CategoryNav from "../components/layout/CategoryNav";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/common/cards/Product";

import { mockTrendingProducts } from "../data/products";
import { useLoaderData } from "react-router";

export const categoryLoader = ({ params }: any) => {
  const categorySlug = params.slug || "all";

  if (categorySlug === "all") {
    return mockTrendingProducts;
  }

  const filterProducts = mockTrendingProducts.filter(
    (product) => product.category === categorySlug,
  );

  return filterProducts;
};

export const CategoryPage = () => {
  const dynamicProducts = useLoaderData() as any[];
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      {/* 1. Yuqori navigatsiya */}
      <div>
        <Navbar />
        <CategoryNav />
      </div>

      {/* 2. Asosiy qism: Faqat Title va Kartalar */}
      <main className="mx-auto w-full max-w-7xl grow px-4 py-8 sm:px-6 lg:px-8">
        {/* Sarlavha */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
        </div>

        {/* Mahsulotlar ro'yxati (6 talik Grid) */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {dynamicProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
};

export default CategoryPage;
