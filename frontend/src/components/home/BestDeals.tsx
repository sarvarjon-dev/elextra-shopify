import React from "react";
import ProductMiniCard from "../common/cards/ProductMiniCard";
import { mockBestDeals } from "../../data/products";

export const BestDeals: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h3 className="mb-4 text-base font-bold text-slate-900">Best Deals</h3>

      {/* 3 ta ustun, 2 qator grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {mockBestDeals.map((product) => (
          <ProductMiniCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestDeals;
