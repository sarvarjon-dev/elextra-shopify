import { Star } from "lucide-react";
import type { Product } from "../../../types/Product";

interface ProductMiniCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export const ProductMiniCard = ({ product, onClick }: ProductMiniCardProps) => {
  const { title, price, imageUrl, rating = 4, reviewCount = 12 } = product;

  return (
    <div
      onClick={() => onClick && onClick(product)}
      className="group flex cursor-pointer items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50"
    >
      {/* 1. Kichik rasm */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 p-1.5">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-contain transition duration-200 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* 2. Ma'lumot qismi */}
      <div className="flex flex-col justify-center">
        <h4 className="line-clamp-2 text-xs font-medium text-slate-800 group-hover:text-orange-500">
          {title}
        </h4>

        <span className="mt-1 text-xs font-bold text-orange-500">
          ${price.toFixed(1)}
        </span>

        <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
          <div className="flex items-center text-amber-400">
            {Array.from({ length: rating }).map((_, i) => (
              <Star
                key={i}
                className="h-2.5 w-2.5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <span>({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductMiniCard;
