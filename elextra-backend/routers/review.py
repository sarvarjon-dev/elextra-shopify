from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from typing import List

from database.connection import get_db
from models.reviews import Review
from models.product import Product
from models.user import User
from schemas.review import ReviewCreate, ReviewResponse
from dependencies import get_current_user

router = APIRouter(tags=["Reviews"])


# 1. Mahsulotga tegishli barcha sharhlarni ko'rish (Ochiq yo'l)
@router.get("/products/{product_id}/reviews", response_model=List[ReviewResponse])
def get_product_reviews(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Mahsulot topilmadi"
        )

    return db.query(Review).filter(Review.product_id == product_id).all()


# 2. Mahsulotga sharh qoldirish (Tizimga kirgan foydalanuvchi)
@router.post(
    "/products/{product_id}/reviews",
    response_model=ReviewResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_review(
    product_id: int,
    review_data: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Mahsulot topilmadi"
        )

    # Bitta foydalanuvchi bitta mahsulotga faqat bitta sharh qoldirishi tekshiruvi
    existing_review = (
        db.query(Review)
        .filter(Review.product_id == product_id, Review.user_id == current_user.id)
        .first()
    )
    if existing_review:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Siz ushbu mahsulotga allaqachon sharh qoldirgansiz",
        )

    # Yangi sharh yaratish
    new_review = Review(
        product_id=product_id,
        user_id=current_user.id,
        rating=review_data.rating,
        comment=review_data.comment,
    )
    db.add(new_review)
    db.flush()  # Sharh ID oladi, lekin hali to'liq saqlanmaydi

    # Mahsulotning o'rtacha reytingi va sharhlar sonini avtomatik hisoblash
    stats = (
        db.query(
            func.avg(Review.rating).label("avg_rating"),
            func.count(Review.id).label("total_reviews"),
        )
        .filter(Review.product_id == product_id)
        .first()
    )

    product.rating = round(float(stats.avg_rating or 0), 1)
    product.reviews_count = int(stats.total_reviews or 0)

    db.commit()
    db.refresh(new_review)
    return new_review
