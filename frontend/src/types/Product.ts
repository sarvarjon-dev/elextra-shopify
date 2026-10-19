export interface Product {
  id: string | number;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean; // true bo'lsa "Add to Cart", false bo'lsa "OUT OF STOCK",
  category: string;
}
