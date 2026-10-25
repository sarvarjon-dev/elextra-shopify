export interface Category {
  id: number | string;
  name: string;
  slug: string;
  image_url?: string | null;
  parent_id?: number | null;
}

export interface ProductSpecifications {
  [key: string]: string;
}

export interface Reviewuser {
  id: number;
  full_name: string;
  email: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string | null;
  product_id: number;
  created_at: string;
  user: Reviewuser;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  slug: string;
  brand?: string | null;
  description: string;
  stock_quantity: number;
  price: number;
  discount_price?: number | null;
  discount_percent?: number | null;
  main_image?: string | null;
  images?: string[] | null;
  specifications?: ProductSpecifications | null;
  rating: number;
  reviews_count: number;
  sold_count: number;
  views_count: number;
  reviews: Review[];
  category_id: number;
  created_at?: string;
  updated_at?: string | null;
}
