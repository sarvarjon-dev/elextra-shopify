import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Navigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

// 1. Zod orqali ma'lumotlarni tekshirish qoidalari (Schema)
const checkoutSchema = z.object({
  shipping_address: z
    .string()
    .min(10, "Manzilni to'liqroq kiriting (kamida 10 ta belgi)"),
  phone_number: z
    .string()
    .min(9, "Telefon raqami noto'g'ri (masalan: +998901234567)"),
});

type CheckoutFormInputs = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cart, totalPrice, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // 2. Savatchadan faqat pichka qo'yilgan (selected) mahsulotlarni ajratib olamiz
  const selectedItems = cart.filter((item) => item.selected);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormInputs>({
    resolver: zodResolver(checkoutSchema),
  });

  // 3. Himoya: Agar mijoz savatchada hech narsani tanlamasdan bu sahifaga kirib qolsa, orqaga qaytaramiz
  if (selectedItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 4. Formani Backend'ga yuborish mantiqi
  const onSubmit = async (data: CheckoutFormInputs) => {
    try {
      const token = Cookies.get("access_token");
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      // Backend (FastAPI) kutayotgan aniq strukturani yig'amiz
      const payload = {
        shipping_address: data.shipping_address,
        phone_number: data.phone_number,
        items: selectedItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      // Backend'ning /orders yo'liga so'rov
      await axios.post("http://localhost:8000/orders/", payload, {
        withCredentials: true,
      });

      selectedItems.forEach((item) => removeFromCart(item.id));
      alert("Buyurtmangiz muvaffaqiyatli qabul qilindi!");

      // Muvaffaqiyatli bo'lsa, mijozni buyurtmalar tarixi sahifasiga yo'naltiramiz
      navigate("/orders"); // keyinroq orders list qilamiz bu yerda
    } catch (error: any) {
      console.error("Buyurtma xatosi:", error);
      alert(
        error.response?.data?.detail || "Buyurtma berishda xatolik yuz berdi",
      );
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-slate-900">
        Buyurtmani rasmiylashtirish
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* CHAP TOMON: Forma */}
        <div className="md:col-span-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-6 text-lg font-semibold text-slate-800">
              Yetkazib berish ma'lumotlari
            </h2>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Yetkazib berish manzili
              </label>
              <textarea
                {...register("shipping_address")}
                rows={3}
                placeholder="Shahar, tuman, ko'cha, uy raqami va mo'ljal..."
                className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              ></textarea>
              {errors.shipping_address && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.shipping_address.message}
                </p>
              )}
            </div>

            <div className="mb-8">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Telefon raqam
              </label>
              <input
                type="text"
                {...register("phone_number")}
                placeholder="+998901234567"
                className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              {errors.phone_number && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-orange-500 py-4 font-bold text-white transition hover:bg-orange-600 disabled:opacity-70"
            >
              {isSubmitting
                ? "Buyurtma yuborilmoqda..."
                : "Buyurtmani tasdiqlash"}
            </button>
          </form>
        </div>

        {/* O'NG TOMON: Buyurtma qisqacha xulosasi (Summary) */}
        <div className="md:col-span-1">
          <div className="sticky top-6 rounded-xl border border-slate-100 bg-gray-50 p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Xarid xulosasi
            </h2>

            <div className="mb-4 max-h-60 overflow-y-auto pr-2">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="mb-3 flex justify-between border-b border-gray-200 pb-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-slate-700 line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-gray-500">
                      {item.quantity} x ${item.price}
                    </p>
                  </div>
                  <p className="font-semibold text-orange-500">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <span className="text-lg font-bold text-slate-800">Jami:</span>
              <span className="text-xl font-bold text-orange-500">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
