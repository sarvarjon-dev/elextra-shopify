import { Trash2, TicketPercent } from "lucide-react"; // Ikonkalar uchun
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";

export const CartPage = () => {
  const {
    cart,
    isAllSelected,
    removeFromCart,
    updateQuantity,
    toggleSelected,
    toggleSelectAll,
  } = useCart();
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl grow px-4 py-8 sm:px-6 lg:px-8">
        {/* Asosiy qismni ikkiga bo'lamiz: Chapda ro'yxat, O'ngda chek */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* ================= CHAP TOMON: SAVATDAGI MAHSULOTLAR ================= */}
          <div className="flex-1 space-y-4">
            {/* Tepadagi Boshqaruv qutisi (Select All, Update, Remove) */}
            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <label className="flex cursor-pointer items-center gap-3 text-sm font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                  className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                Select All
              </label>
              <div className="flex gap-4 text-sm font-bold text-orange-500">
                <button className="hover:text-orange-600">UPDATE CART</button>
                <button className="hover:text-orange-600">REMOVE</button>
              </div>
            </div>

            {/* Mahsulotlar ro'yxati (Map) */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                {/* Checkbox va Rasm */}
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSelected(item.id)}
                    className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <div className="h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={item.main_image || "https://via.placeholder.com/150"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Ma'lumotlar */}
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-slate-900 line-clamp-1">
                      {item.name}
                    </h3>
                    <span className="text-xs text-slate-400">
                      SKU {item.sku}
                    </span>
                  </div>
                  <p className="mt-1 font-bold text-orange-500">
                    ${item.price}
                  </p>
                  <button className="mt-2 text-left text-xs text-slate-400 hover:text-slate-600">
                    + Add note
                  </button>
                </div>

                {/* Harakatlar (Miqdor, O'chirish, Yoqtirish) */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                  {/* Miqdor */}
                  <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 font-bold text-slate-500 hover:text-orange-500"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 font-bold text-slate-500 hover:text-orange-500"
                    >
                      +
                    </button>
                  </div>

                  {/* O'chirish */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Yoqtirish (Heart) */}
                  {/* <button
                    className={`rounded-lg border p-2 transition-colors ${
                      item.
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-slate-200 text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={item.liked ? "currentColor" : "none"}
                    />
                  </button> */}
                </div>
              </div>
            ))}
          </div>

          {/* ================= O'NG TOMON: HISOB-KITOB (SUMMARY) ================= */}
          <div className="w-full lg:w-95 space-y-4">
            {/* Promo Code */}
            <button className="flex w-full items-center justify-between rounded-xl border border-orange-200 bg-orange-50 p-4 font-bold text-orange-500 transition hover:bg-orange-100">
              <div className="flex items-center gap-2">
                <TicketPercent size={20} />I have promo code
              </div>
              <span>{">"}</span>
            </button>

            {/* Shopping Summary */}
            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-bold text-slate-900">
                Shopping Summary
              </h2>

              <div className="mb-6 flex items-center justify-between border-t border-slate-100 pt-6">
                <span className="text-xl font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-orange-500">
                  $1,952.66
                </span>
              </div>

              <button className="w-full rounded-lg bg-orange-500 py-4 font-bold text-white shadow-md transition hover:bg-orange-600 hover:shadow-lg">
                CHECKOUT
              </button>

              <button className="mt-4 block w-full text-center text-sm font-medium text-slate-500 hover:text-slate-900">
                Back to Shopping
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
