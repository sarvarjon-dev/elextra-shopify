import ProductCard from "../components/common/cards/Product";
import { useLoaderData } from "react-router";
import { getProducts } from "../loaders/productLoader";

export const categoryLoader = async ({ params }: any) => {
  try {
    const { slug } = params;

    const products = await getProducts(slug);
    return products;
  } catch (err) {
    console.log("something went wrong", err);
  }
};

export const CategoryPage = () => {
  const dynamicProducts = useLoaderData() as any[];
  console.log("categoriyaga mos mahsulotlar", dynamicProducts);
  return (
    <div>
      {/* 2. Asosiy qism: Faqat Title va Kartalar */}
      <main className="mx-auto w-full max-w-7xl grow px-4 py-8 sm:px-6 lg:px-8">
        {/* Sarlavha */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
        </div>

        {/* Mahsulotlar ro'yxati (6 talik Grid) */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {dynamicProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
