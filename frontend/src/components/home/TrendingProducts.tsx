// src/components/home/TrendingProducts.tsx
import React from "react";
import { mockTrendingProducts } from "../../data/products";
import ProductCard from "../common/cards/Product";

export const TrendingProducts: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Sarlavha qismi */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Trending Products
          </h2>
          <p className="text-xs text-slate-400">Showing 6 of 120 result</p>
        </div>
      </div>

      {/* Grid holatida kartalarni chiqarish */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {mockTrendingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
