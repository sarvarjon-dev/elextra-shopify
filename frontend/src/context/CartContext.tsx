import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "../types";

export interface CartItem extends Product {
  quantity: number;
  selected: boolean;
}

interface CartContextType {
  cart: CartItem[];
  isAllSelected: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void; // agar id string bo'lsa string qilasiz
  updateQuantity: (productId: number, quantity: number) => void;
  toggleSelected: (productId: number) => void;
  toggleSelectAll: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const isAllSelected = cart.length > 0 && cart.every((item) => item.selected);

  // Mahsulot qo'shish
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      // Mahsulot oldin qo'shilganligini tekshiramiz
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Agar bor bo'lsa, faqat miqdorini (quantity) bittaga oshiramiz
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // Agar yo'q bo'lsa, yangi qo'shamiz (default: quantity: 1, selected: true)
      return [...prevCart, { ...product, quantity: 1, selected: true }];
    });
  };

  // 2. MAHSULOTNI O'CHIRISH
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // 3. MIQDORNI O'ZGARTIRISH (Masalan, input orqali aniq son yozganda yoki + / - bosganda)
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return; // Miqdor 0 yoki manfiy bo'lib ketishining oldini olamiz

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  // 4. BITTA MAHSULOTNI BELGILASH / BEKOR QILISH (Checkbox uchun)
  const toggleSelected = (productId: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  // 5. HAMMASINI BELGILASH / BEKOR QILISH
  const toggleSelectAll = () => {
    setCart((prevCart) =>
      prevCart.map((item) => ({ ...item, selected: !isAllSelected })),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isAllSelected,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSelected,
        toggleSelectAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
