import { useState } from "react";
import ReviewCard from "../components/common/cards/ReviewCard";
import { useLoaderData, useNavigate } from "react-router";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

export const ProductDetailPage = () => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const product = useLoaderData() as Product;
  const navigate = useNavigate();

  // Maxsus funksiya yozamiz
  const handleAddToCart = () => {
    addToCart(product, quantity); // Context'dagi funksiyani ishlatib xotiraga yozamiz

    setIsAdded(true); // Tugma holatini "Qo'shildi" ga o'zgartiramiz
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // Vaqtincha 3 ta rasm yasab olamiz (biri o'zining rasmi, ikkitasi oddiy namuna)
  const productImages = [
    { id: 1, url: product?.main_image || "" },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&q=80",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    },
  ];

  // Aktiv rasmni saqlaydigan state (boshida 1-rasm turadi)
  const [activeImg, setActiveImg] = useState(productImages[0]);
  // Miqdor uchun xotira (boshlang'ich qiymat 1)
  const [quantity, setQuantity] = useState(1);

  // Razmer tanlash uchun xotira
  const [selectedSize, setSelectedSize] = useState("24-inch");
  const sizes = ["14-inch", "24-inch", "32-inch", "60-inch"]; // Dizayndagi razmerlar

  // Agar bunday id lik mahsulot topilmasa, xato sahifasi ko'rsatamiz
  // Agar xatolik bo'lib mahsulot kelmasa (null bo'lsa), xatoni ko'rsatamiz
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold text-gray-700">
          Mahsulot topilmadi 😕
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-slate-200 rounded"
        >
          Orqaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Asosiy Qism */}
      <main className="mx-auto w-full max-w-7xl grow px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigatsiya (Breadcrumb) */}
        <div className="mb-6 text-sm text-slate-500">
          <a className="hover:text-orange-500" href="/">
            Home
          </a>{" "}
          {">"} <span className="font-bold text-slate-900">{product.name}</span>
        </div>

        {/* Ekranni ikkiga bo'lamiz: Chapda Rasm, O'ngda Ma'lumot */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* 1. CHAP TOMON: Rasmlar Galereyasi */}
          <div className="flex gap-4">
            {/* Kichik rasmlar (Thumbnails) */}
            <div className="flex flex-col gap-3">
              {productImages.map((img) => {
                const isActive = activeImg.id === img.id;

                return (
                  <img
                    key={img.id}
                    src={img.url}
                    alt="thumbnail"
                    onClick={() => setActiveImg(img)}
                    className={`h-24 w-24 cursor-pointer rounded-lg border-2 object-cover p-1 transition-all ${
                      isActive
                        ? "border-orange-500 shadow-sm" // Bosilgandagi dizayn
                        : "border-transparent bg-white hover:border-orange-300" // Oddiy holati
                    }`}
                  />
                );
              })}
            </div>

            {/* Asosiy Katta Rasm */}
            <div className="flex h-112.5 w-full items-center justify-center rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <img
                src={activeImg.url}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />
            </div>
          </div>

          {/* 2. O'NG TOMON: Ma'lumotlar va Tugmalar */}
          <div className="flex flex-col rounded-xl bg-white p-8 shadow-sm border border-slate-100">
            {/* 1. Sarlavha va Reyting */}
            <p className="text-sm text-slate-400">SKU: {product.sku}</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center text-yellow-400">
                ★ ★ ★ ★ ☆{" "}
                <span className="ml-2 text-slate-600 font-bold">4.0</span>
              </div>
              <span className="hidden sm:inline">|</span>
              <span>{product.reviews.length} Reviews</span>
              <span className="hidden sm:inline">|</span>
              <span>{product.sold_count} sold</span>
            </div>

            {/* 2. Narx qismi */}
            {/* 2. Narx qismi */}
            <div className="mt-6 flex items-end gap-3">
              {product.discount_price ? (
                /* AGAR CHEGIRMA BO'LSA: Ikkala narx va foiz ko'rinadi */
                <>
                  <p className="text-4xl font-bold text-orange-500">
                    ${product.discount_price}
                  </p>
                  <p className="text-lg text-slate-400 line-through mb-1">
                    ${product.price}
                  </p>
                  {/* Foizni avtomatik hisoblash */}
                  <span className="mb-2 rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                    Save{" "}
                    {Math.round(
                      ((product.price - product.discount_price) /
                        product.price) *
                        100,
                    )}
                    %
                  </span>
                </>
              ) : (
                /* AGAR CHEGIRMA YO'Q BO'LSA: Faqat oddiy narx o'zi katta bo'lib chiqadi */
                <p className="text-4xl font-bold text-slate-900">
                  ${product.price}
                </p>
              )}
            </div>

            {/* Description qismi */}
            <div className="mt-5">
              <p className="text-base text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* 3. Qisqacha xususiyatlari */}
            <div className="mt-6 border-t border-slate-100 pt-6">
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  ✓ Direct Full Array backlighting
                </li>
                <li className="flex items-center gap-2">
                  ✓ Quantum Dot technology
                </li>
                <li className="flex items-center gap-2">✓ Ambient Mode</li>
                <li className="flex items-center gap-2">
                  ✓ One Remote control
                </li>
              </ul>
            </div>

            {/* 4. Razmer tanlash (Variantlar) */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                Screen Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-orange-500 bg-orange-50 text-orange-600" // Tanlangandagi dizayn
                        : "border-slate-200 text-slate-600 hover:border-slate-300" // Oddiy holati
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Harakat tugmalari (Miqdor va Savatga qo'shish) */}
            <div className="mt-auto pt-8 flex items-center gap-4">
              {/* Miqdor hisoblagichi */}
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50">
                <button
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  className="px-4 py-3 text-slate-500 hover:text-orange-500 font-bold text-xl"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 text-slate-500 hover:text-orange-500 font-bold text-xl"
                >
                  +
                </button>
              </div>

              {/* Tugmalar */}
              <button className="flex-1 rounded-lg border-2 border-orange-500 px-6 py-3 font-bold text-orange-500 transition-all hover:bg-orange-50">
                BUY
              </button>
              <button
                onClick={handleAddToCart}
                disabled={isAdded} // Qo'shildi yozuvi turganda qayta bosishni vaqtincha taqiqlaymiz
                className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                  isAdded
                    ? "bg-green-500 text-white" // Bosilganda yashil bo'ladi
                    : "bg-blue-600 hover:bg-blue-700 text-white" // Asl holati (ko'k)
                }`}
              >
                {isAdded ? "✓ Savatchaga qo'shildi" : "Savatchaga qo'shish"}
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Tepadagi Asosiy Grid qismi tugadi */}

      {/* 3. SHARHLAR (REVIEWS) QISMI */}
      <div className="mt-16 rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Customer Reviews ({product?.reviews.length || 0})
        </h2>

        <div className="flex flex-col">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <div className="py-8 text-center text-slate-500">
              Hali hech kim izoh qoldirmagan. Birinchi bo'lib izoh yozing
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
