from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# Foydalanuvchi qisqa ma'lumoti (sharh egasining ismi chiqishi uchun)
class ReviewUserResponse(BaseModel):
    id: int
    full_name: str
    email: str

    class Config:
        from_attributes = True


# Sharh qoldirish sxemasi (POST)
class ReviewCreate(BaseModel):
    rating: int = Field(
        ..., ge=1, le=5, description="Baho 1 dan 5 gacha bo'lishi kerak"
    )
    comment: Optional[str] = None


# Sharhni qaytarish sxemasi (GET)
class ReviewResponse(BaseModel):
    id: int
    rating: int
    comment: Optional[str]
    product_id: int
    created_at: datetime
    user: ReviewUserResponse

    class Config:
        from_attributes = True
