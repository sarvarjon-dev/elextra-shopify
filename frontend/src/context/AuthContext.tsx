import axios from "axios";
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";

// 1. Backenddan keladigan foydalanuvchi ma'lumotlari qolipi
interface User {
  id: string;
  full_name: string;
  email: string;
}

// 2. Context nimalarni o'z ichiga olishini belgilaymiz
interface AuthContextType {
  user: User | null; // Boshida hech kim kirmagan bo'ladi (null)
  login: (token: string) => Promise<void>;
  logout: () => void;
}

// 3. Context'ning o'zini yaratamiz
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Butun saytni o'rab turuvchi Provider (Yetkazib beruvchi)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Markaziy userni olish funksiyasi
  const fetchAndSetUser = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:8000/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      return true; // Muvaqaffiyatli bo'lsa true
    } catch (error) {
      console.error("Token yaroqsiz:", error);
      logout();
      return false; // Xato bo'lsa false
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      // Cookie'dan tokenni o'qish
      const token = Cookies.get("access_token");

      if (token) {
        await fetchAndSetUser(token);
      }
      setLoading(false); // Tekshiruv tugadi
    };

    checkUser();
  }, []);

  // Userni tizimdan chiqarib tashlaymiz biror xatolik bo'lsa
  const logout = () => {
    Cookies.remove("access_token");
    setUser(null);
  };

  const login = async (token: string) => {
    Cookies.set("access_token", token, { expires: 7 });

    await fetchAndSetUser(token); // Yana o'sha tayyor funksiyani chaqiramiz
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 5. Boshqa fayllarda oson ishlatish uchun maxsus Hook (Kichkina yordamchi funksiya)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth faqat AuthProvider ichida ishlatilishi kerak");
  }
  return context;
};
