from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from database.connection import get_db
from models.product import Product
from models.category import Category
from models.user import User
from schemas.product import ProductCreate, ProductUpdate, ProductResponse
from dependencies import get_current_admin

router = APIRouter(prefix="/products", tags=["Products"])


# 1. Ochiq yo'l: Barcha mahsulotlar ro'yxatini olish (ixtiyoriy category_id filtri bilan)
@router.get("/", response_model=List[ProductResponse])
def get_products(category_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(Product)
    if category_id:
        query = query.filter(Product.category_id == category_id)
    return query.all()


# 2. Ochiq yo'l: Bitta mahsulotni ID orqali olish
@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Mahsulot topilmadi"
        )
    return product


# 3. Faqat ADMIN: Yangi mahsulot qo'shish
@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    # Kategoriya bazada bormi-yo'qligini tekshiramiz
    category = (
        db.query(Category).filter(Category.id == product_data.category_id).first()
    )
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bunday kategoriya ID mavjud emas",
        )

    # SKU unikal bo'lishi shart
    existing_sku = db.query(Product).filter(Product.sku == product_data.sku).first()
    if existing_sku:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bunday SKU kodli mahsulot allaqachon mavjud",
        )

    new_product = Product(**product_data.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


# 4. Faqat ADMIN: Mahsulotni yangilash
@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product_data: ProductUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Mahsulot topilmadi"
        )

    # Kelgan ma'lumotlarni ustiga yozib chiqamiz
    update_data = product_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product


# 5. Faqat ADMIN: Mahsulotni o'chirish
@router.delete("/{product_id}", status_code=status.HTTP_200_OK)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Mahsulot topilmadi"
        )

    db.delete(product)
    db.commit()
    return {"message": "Mahsulot muvaffaqiyatli o'chirildi"}
