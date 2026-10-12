from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime


# Mahsulotning qisqa ko'rinishi (Response uchun)
class ProductShortResponse(BaseModel):
    id: int
    name: str
    main_image: Optional[str] = None

    class Config:
        from_attributes = True


# Foydalanuvchi yuboradigan item (Request)
class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(
        ..., gt=0, description="Mahsulot soni kamida 1 bo'lishi kerak"
    )


# Foydalanuvchi yuboradigan asosiy buyurtma (Request)
class OrderCreate(BaseModel):
    shipping_address: str = Field(..., min_length=5)
    phone_number: str = Field(..., min_length=7)
    items: List[OrderItemCreate] = Field(
        ..., min_items=1, description="Kamida 1 ta mahsulot bo'lishi kerak"
    )


# Javobda qaytadigan har bir item (Response)
class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: float
    product: ProductShortResponse

    class Config:
        from_attributes = True


# Javobda qaytadigan to'liq buyurtma (Response)
class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_price: float
    status: str
    shipping_address: str
    phone_number: str
    created_at: datetime
    items: List[OrderItemResponse]

    model_config = ConfigDict(from_attributes=True)
