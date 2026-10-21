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
  login: (userData: User, token: string) => void;
  logout: () => void;
}

// 3. Context'ning o'zini yaratamiz
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Butun saytni o'rab turuvchi Provider (Yetkazib beruvchi)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      // Cookie'dan tokenni o'qish
      const token = Cookies.get("access_token");

      if (token) {
        try {
          // Token bo'lsa, FastAPI'dagi /me yo'liga so'rov yuboramiz
          const response = await axios.get("http://localhost:8000/me", {
            headers: {
              Authorization: `Bearer ${token}`, // Tokenni sarlavhada jo'natamiz
            },
          });
          // Qaytgan haqiqiy ma'lumotni state'ga joylaymiz
          setUser(response.data);
        } catch (error) {
          console.error("Token yaroqsiz yoki eskirgan", error);
          Cookies.remove("access_token"); // Xato bo'lsa tokenni o'chirib tashlaymiz
        }
      }
      setLoading(false); // Tekshiruv tugadi
    };

    checkUser();
  }, []);

  const login = (userData: User, token: string) => {
    Cookies.set("access_token", token, { expires: 7 });
    setUser(userData);
    localStorage.setItem("token", token); // Tokenni brauzerga saqlaymiz
  };

  const logout = () => {
    Cookies.remove("access_token");
    setUser(null);
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
