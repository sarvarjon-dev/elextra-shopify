// src/components/common/cards/ProductCard.tsx
import React from "react";
import { Star } from "lucide-react";
import type { Product } from "../../../types/Product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    title,
    price,
    imageUrl,
    rating = 4.5,
    reviewCount = 12,
    inStock = true,
  } = product;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition duration-200 hover:shadow-md">
      {/* 1. Mahsulot Rasmi */}
      <div className="relative mb-3 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-slate-50">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-contain p-2 transition duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* 2. Mahsulot Haqida Ma'lumot */}
      <div className="flex flex-1 flex-col">
        <h4 className="line-clamp-2 min-h-10 text-xs font-semibold text-slate-800 hover:text-orange-500">
          {title}
        </h4>

        {/* Narx va Reyting qatori */}
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="font-bold text-orange-500 text-sm">
            ${price.toFixed(1)}
          </span>

          <div className="flex items-center gap-1 text-slate-500">
            <div className="flex items-center text-amber-400">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              ({reviewCount})
            </span>
          </div>
        </div>
      </div>

      {/* 3. Add to Cart / Out of Stock Tugmasi */}
      <div className="mt-4">
        {inStock ? (
          <button
            type="button"
            className="w-full rounded-md border border-orange-400 py-1.5 text-xs font-medium text-orange-500 transition hover:bg-orange-500 hover:text-white"
          >
            Add to cart
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="w-full cursor-not-allowed rounded-md bg-slate-100 py-1.5 text-xs font-medium text-slate-400"
          >
            OUT OF STOCK
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
