import { useParams } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { mockTrendingProducts } from "../data/products";
import { useState } from "react";
import ReviewCard, { mockReviews } from "../components/common/cards/ReviewCard";

export const ProductDetailPage = () => {
  // 1. URL'dan id ni ushlab olamiz (masalan: /product/1 bo'lsa, id = "1")
  const { id } = useParams();

  // 2. Shu id ga teng bo'lgan mahsulotni vaqtincha bazamizdan (mock) qidirib topamiz
  const product = mockTrendingProducts.find((item) => String(item.id) === id);

  // Vaqtincha 3 ta rasm yasab olamiz (biri o'zining rasmi, ikkitasi oddiy namuna)
  const productImages = [
    { id: 1, url: product?.imageUrl || "" },
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
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold text-red-500">
        Mahsulot topilmadi!
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-slate-50">
      <Navbar />

      {/* Asosiy Qism */}
      <main className="mx-auto w-full max-w-7xl grow px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigatsiya (Breadcrumb) */}
        <div className="mb-6 text-sm text-slate-500">
          Home {">"} {product.category} {">"}{" "}
          <span className="font-bold text-slate-900">{product.title}</span>
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
                alt={product.title}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />
            </div>
          </div>

          {/* 2. O'NG TOMON: Ma'lumotlar va Tugmalar */}
          <div className="flex flex-col rounded-xl bg-white p-8 shadow-sm border border-slate-100">
            {/* 1. Sarlavha va Reyting */}
            <p className="text-sm text-slate-400">SKU: 223234124</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 leading-tight">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center text-yellow-400">
                ★ ★ ★ ★ ☆{" "}
                <span className="ml-2 text-slate-600 font-bold">4.0</span>
              </div>
              <span className="hidden sm:inline">|</span>
              <span>223 Reviews</span>
              <span className="hidden sm:inline">|</span>
              <span>4,320 sold</span>
            </div>

            {/* 2. Narx qismi */}
            <div className="mt-6 flex items-end gap-3">
              <p className="text-4xl font-bold text-orange-500">
                ${product.price}
              </p>
              {/* Agar eski narx bo'lsa uni chizilgan qilib ko'rsatamiz */}
              <p className="text-lg text-slate-400 line-through mb-1">
                $1,200.99
              </p>
              <span className="mb-2 rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                Save 19%
              </span>
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
              <button className="flex-1 rounded-lg bg-orange-500 px-6 py-3 font-bold text-white transition-all hover:bg-orange-600 shadow-md hover:shadow-lg">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Tepadagi Asosiy Grid qismi tugadi */}

      {/* 3. SHARHLAR (REVIEWS) QISMI */}
      <div className="mt-16 rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Customer Reviews ({mockReviews.length})
        </h2>

        <div className="flex flex-col">
          {mockReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
