import type { Product } from "../types/Product";

export const mockTrendingProducts: Product[] = [
  {
    id: 1,
    title: "Macbook Pro 2020 With 256 SSD",
    price: 33.3,
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    rating: 4.8,
    reviewCount: 12,
    inStock: true,
  },
  {
    id: 2,
    title: "Ultra slim Macbook Pro 2020",
    price: 642.4,
    imageUrl:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400",
    rating: 4.9,
    reviewCount: 12,
    inStock: true,
  },
  {
    id: 3,
    title: "Hi Boost Laptop Gaming Ultra X021",
    price: 234.2,
    imageUrl:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
    rating: 4.5,
    reviewCount: 10,
    inStock: true,
  },
  {
    id: 4,
    title: "White Laptop Ultra Slim 260 SSD",
    price: 95.4,
    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
    rating: 4.2,
    reviewCount: 12,
    inStock: false, // "OUT OF STOCK" holatini sinash uchun
  },
  {
    id: 5,
    title: "Desktop PC Gaming with Console",
    price: 45.3,
    imageUrl:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400",
    rating: 4.7,
    reviewCount: 10,
    inStock: true,
  },
  {
    id: 6,
    title: "Full Set PC Desktop Black Mamba",
    price: 221.2,
    imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400",
    rating: 4.6,
    reviewCount: 10,
    inStock: true,
  },
];

export const mockBestDeals: Product[] = [
  {
    id: 101,
    title: "Fitness and activity Tracker",
    price: 33.3,
    imageUrl:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200",
    rating: 4,
    reviewCount: 12,
  },
  {
    id: 102,
    title: "Xbox White Joystick",
    price: 98.4,
    imageUrl:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=200",
    rating: 4,
    reviewCount: 12,
  },
  {
    id: 103,
    title: "Super Boost Headphones",
    price: 33.3,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
    rating: 4,
    reviewCount: 12,
  },
  {
    id: 104,
    title: "Ice White Airpods",
    price: 521.2,
    imageUrl:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200",
    rating: 4,
    reviewCount: 12,
  },
  {
    id: 105,
    title: "Hozor Mouse Gaming",
    price: 21.3,
    imageUrl:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200",
    rating: 4,
    reviewCount: 12,
  },
  {
    id: 106,
    title: "Fitness and activity Tracker",
    price: 33.3,
    imageUrl:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=200",
    rating: 4,
    reviewCount: 12,
  },
];
