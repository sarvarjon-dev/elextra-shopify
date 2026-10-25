from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime
from schemas.review import ReviewResponse

# Asosiy umumiy maydonlar
class ProductBase(BaseModel):
    sku: str
    name: str
    slug: str
    brand: Optional[str] = None
    description: Optional[str] = None
    price: float
    discount_price: Optional[float] = None
    discount_percent: Optional[int] = None
    stock_quantity: int = 0
    main_image: Optional[str] = None
    images: Optional[List[str]] = None
    specifications: Optional[Dict[str, Any]] = None  # Moslashuvchan JSON uchun
    category_id: int


# 1. Mahsulot qo'shish sxemasi (POST)
class ProductCreate(ProductBase):
    pass


# 2. Mahsulotni tahrirlash sxemasi (PUT / PATCH)
class ProductUpdate(BaseModel):
    sku: Optional[str] = None
    name: Optional[str] = None
    slug: Optional[str] = None
    brand: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    discount_price: Optional[float] = None
    discount_percent: Optional[int] = None
    stock_quantity: Optional[int] = None
    main_image: Optional[str] = None
    images: Optional[List[str]] = None
    specifications: Optional[Dict[str, Any]] = None
    category_id: Optional[int] = None


# 3. Frontendga qaytadigan to'liq javob sxemasi (GET)
class ProductResponse(ProductBase):
    id: int
    rating: float
    reviews_count: int
    sold_count: int
    views_count: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    reviews: List[ReviewResponse] = []

    class Config:
        from_attributes = True
