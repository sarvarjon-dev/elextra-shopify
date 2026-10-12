from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import asc, desc
from typing import List, Optional

from database.connection import get_db
from models.product import Product
from models.category import Category
from models.user import User
from schemas.product import ProductCreate, ProductUpdate, ProductResponse
from dependencies import get_current_admin

router = APIRouter(prefix="/products", tags=["Products"])


# 1. Ochiq yo'l: Barcha mahsulotlar ro'yxatini olish (Filtrlash, Saralash va Sahifalash bilan)
@router.get("/", response_model=List[ProductResponse])
def get_products(
    category_id: Optional[int] = None,  # Sizning eski kodingizdagi kategoriya filtri
    skip: int = Query(0, ge=0, description="Nechta mahsulotni o'tkazib yuborish"),
    limit: int = Query(
        10, ge=1, le=50, description="Bitta sahifada nechta mahsulot chiqishi"
    ),
    sort_by: Optional[str] = Query(
        None, description="Saralash turi: 'price', 'bestseller', 'newest'"
    ),
    order: str = Query("asc", description="Tartib: 'asc' yoki 'desc'"),
    db: Session = Depends(get_db),
):
    # 1. Boshlang'ich so'rov (hali bazaga bormadi)
    query = db.query(Product)

    # 2. Kategoriya bo'yicha filtrlash (Sizning kodingiz saqlab qolindi)
    if category_id:
        query = query.filter(Product.category_id == category_id)

    # 3. Saralash mantiqi (Yangi qo'shilgan kod)
    if sort_by == "price":
        if order == "desc":
            query = query.order_by(desc(Product.price))
        else:
            query = query.order_by(asc(Product.price))

    elif sort_by == "newest":
        # Eng yangi qo'shilganlar
        query = query.order_by(desc(Product.created_at))

    # Agar Product modelida sold_count (sotilgan soni) degan ustun qo'shgan bo'lsangiz:
    elif sort_by == "bestseller":
        query = query.order_by(desc(Product.sold_count))

    # 4. Sahifalash va bazadan barchasini tortib olish
    return query.offset(skip).limit(limit).all()


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
