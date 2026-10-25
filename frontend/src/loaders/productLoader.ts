import axios from "axios";

export const getProducts = async (slug?: string) => {
  const url =
    slug && slug != "all"
      ? `http://localhost:8000/products/?category_slug=${slug}`
      : `http://localhost:8000/products/`;

  const response = await axios.get(url);
  return response.data;
};

export const getProductById = async (id: string | number) => {
  const response = await axios.get(`http://localhost:8000/products/${id}`);
  return response.data;
};

export const productDetailLoader = async ({ params }: any) => {
  const { id } = params;
  try {
    const product = await getProductById(id);
    return product;
  } catch (err) {
    console.log("mahsulot yuklashda xatolik", err);
    return null;
  }
};
