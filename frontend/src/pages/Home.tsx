import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import CategoryNav from "../components/layout/CategoryNav";
import TrendingProducts from "../components/home/TrendingProducts";
import BestDeals from "../components/home/BestDeals";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* 1. Yuqori qism (Navbar) */}
      <div>
        <Navbar />
        <CategoryNav />
      </div>

      {/* 2. O'rta qism (Bo'sh bo'lsa ham butun bo'sh joyni egallaydi) */}
      <main className="grow">
        <BestDeals />
        <TrendingProducts />
      </main>

      {/* 3. Footer avtomatik eng pastga tushadi */}
      <Footer />
    </div>
  );
}

export default Home;
