import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: {
    name: string;
  };
}

interface Order {
  id: number;
  total_price: number;
  status: string;
  shipping_address: string;
  created_at: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Backendga cookie orqali murojaat qilamiz
        const response = await axios.get(
          "http://localhost:8000/orders/my-orders",
          {
            withCredentials: true,
          },
        );
        setOrders(response.data); // Muvaffaqiyatli bo'lsa, state'ga saqlaymiz
      } catch (error) {
        console.error("Buyurtmalarni yuklashda xatolik:", error);
        setError(
          "Buyurtmalarni yuklab bo'lmadi. Iltimos, qayta urinib ko'ring.",
        );
      } finally {
        setLoading(false); // Xato bo'lsa ham, to'g'ri bo'lsa ham yuklanishni to'xtatamiz
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Buyurtmalarim</h1>

      {loading && <p className="text-slate-600">Buyurtmalar yuklanmoqda...</p>}
      {error && (
        <p role="alert" className="text-red-600">
          {error}
        </p>
      )}
      {!loading && !error && orders.length === 0 && (
        <p className="text-slate-600">Hozircha buyurtmalaringiz yo&apos;q.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold text-slate-900">
                Buyurtma #{order.id}
              </h2>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-sm text-orange-700">
                {order.status}
              </span>
            </div>
            <p className="mb-3 text-sm text-slate-600">
              {new Date(order.created_at).toLocaleString()}
              {" · "}
              Yetkazish manzili: {order.shipping_address}
            </p>
            <ul className="space-y-2 border-t border-slate-100 pt-3">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between gap-4 text-sm text-slate-700"
                >
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-right font-bold text-slate-900">
              Jami: ${order.total_price.toFixed(2)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
