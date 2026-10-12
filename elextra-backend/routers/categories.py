from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database.connection import get_db
from models.category import Category
from models.user import User
from schemas.category import CategoryCreate, CategoryResponse
from dependencies import get_current_admin

router = APIRouter(prefix="/categories", tags=["Categories"])


# 1. Ochiq yo'l: Barcha kategoriyalarni olish (Hamma ko'ra oladi)
@router.get("/", response_model=List[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return categories


# 2. Ochiq yo'l: Bitta kategoriyani ID bo'yicha olish
@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Kategoriya topilmadi"
        )
    return category


# 3. Faqat ADMIN uchun: Yangi kategoriya yaratish
@router.post("/", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
def create_category(
    category_data: CategoryCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    # Slug takrorlanmasligini tekshiramiz
    existing = db.query(Category).filter(Category.slug == category_data.slug).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bunday slug allaqachon mavjud",
        )

    new_category = Category(**category_data.model_dump())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category


# 4. Faqat ADMIN uchun: Kategoriyani o'chirish
@router.delete("/{category_id}", status_code=status.HTTP_200_OK)
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Kategoriya topilmadi"
        )

    db.delete(category)
    db.commit()
    return {"message": "Kategoriya muvaffaqiyatli o'chirildi"}
