import { useEffect, useState } from "react";
import "./App.css";
import api from "../api";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const name = "sarvar";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        console.log(response);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Elextra - Eng Yangi Mahsulotlar
      </h1>

      {loading ? (
        <p className="text-center text-xl font-medium text-gray-500">
          Yuklanmoqda...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Rasm uchun vaqtincha joy (Keyinroq bu yerga haqiqiy url qo'yamiz) */}
              <div className="bg-gray-200 h-48 w-full rounded-lg mb-4 flex items-center justify-center text-gray-500">
                Rasm ({product.name.slice(0, 5)}...)
              </div>

              <h2
                className="text-lg font-semibold text-gray-800 truncate"
                title={product.name}
              >
                {product.name}
              </h2>

              <p className="text-sm text-gray-500 line-clamp-2 mt-1 min-h-10">
                {product.description}
              </p>

              <div className="mt-4 flex justify-between items-center border-t pt-4">
                <span className="text-xl font-bold text-blue-600">
                  ${product.price}
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer">
                  Savatga
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
