// src/components/common/cards/ProductCard.tsx
import React, { useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router";
import type { Product } from "../../../types";
import { useCart } from "../../../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    name,
    price,
    main_image,
    reviews_count = 12,
    stock_quantity,
  } = product;
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1); // 1. Context'ga qo'shamiz (Navbar'dagi raqam oshadi)
    setIsAdded(true); // 2. Tugma holatini "Qo'shildi" holatiga o'tkazamiz

    // 3. 2 soniyadan keyin yana eski holatiga qaytaramiz
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition duration-200 hover:shadow-md">
      {/* 1. Mahsulot Rasmi */}
      <Link
        to={`/product/${product.id}`}
        aria-label={`View ${name} details`}
        className="relative mb-3 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-slate-50"
      >
        <img
          src={main_image || "https://placehold.co/300x300?text=No+Image"}
          alt={name}
          className="h-full w-full object-contain p-2 transition duration-300 hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* 2. Mahsulot Haqida Ma'lumot */}
      <div className="flex flex-1 flex-col">
        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 min-h-10 text-xs font-semibold text-slate-800 hover:text-orange-500"
        >
          {name}
        </Link>

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
              ({reviews_count})
            </span>
          </div>
        </div>
      </div>

      {/* 3. Add to Cart / Out of Stock Tugmasi */}
      <div className="mt-4">
        {stock_quantity > 0 ? (
          <button
            onClick={handleAddToCart}
            type="button"
            disabled={isAdded} // Bosilgandan keyin 2 soniya davomida yana bosib yubormasligi uchun
            className={`w-full rounded-md border py-1.5 text-xs font-medium transition-all duration-300 ${
              isAdded
                ? "bg-green-500 text-white border-green-500" // Qo'shilgan paytdagi yashil rang
                : "border-orange-400 text-orange-500 hover:bg-orange-50" // Oddiy paytdagi rang
            }`}
          >
            {isAdded ? "Added! ✓" : "Add to cart"}
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
