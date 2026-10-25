import TrendingProducts from "../components/home/TrendingProducts";
import BestDeals from "../components/home/BestDeals";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="grow">
        <BestDeals />
        <TrendingProducts />
      </main>
    </div>
  );
}

export default Home;
