from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database.connection import get_db
from models.order import Order, OrderItem
from models.product import Product
from models.user import User
from schemas.order import OrderCreate, OrderResponse
from dependencies import get_current_user, get_current_admin

router = APIRouter(prefix="/orders", tags=["Orders"])


# 1. Buyurtma yaratish (Har qanday ro'yxatdan o'tgan foydalanuvchi)
@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    total_price = 0.0
    order_items_to_create = []

    # Har bir buyurtma qilinayotgan tovar tekshiriladi
    for item_data in order_data.items:
        product = db.query(Product).filter(Product.id == item_data.product_id).first()
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"ID {item_data.product_id} bo'lgan mahsulot topilmadi",
            )

        # Ombordagi zaxira yetarliligini tekshiramiz
        if product.stock_quantity < item_data.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"'{product.name}' uchun yetarli zaxira yo'q. Qolgan: {product.stock_quantity}",
            )

        # Narxni hisoblaymiz (chegirma narxi bo'lsa uni olamiz)
        active_price = product.price
        item_total = active_price * item_data.quantity
        total_price += item_total

        # Ombor hisobini yangilaymiz
        product.stock_quantity -= item_data.quantity
        product.sold_count += item_data.quantity

        # OrderItem modelini tayyorlaymiz
        order_item = OrderItem(
            product_id=product.id, quantity=item_data.quantity, price=active_price
        )
        order_items_to_create.append(order_item)

    # Asosiy buyurtmani yaratamiz
    new_order = Order(
        user_id=current_user.id,
        total_price=round(total_price, 2),
        shipping_address=order_data.shipping_address,
        phone_number=order_data.phone_number,
        status="pending",
    )
    db.add(new_order)
    db.flush()  # new_order.id hosil bo'lishi uchun

    # Har bir itemga buyurtma ID sini bog'laymiz
    for order_item in order_items_to_create:
        order_item.order_id = new_order.id
        db.add(order_item)

    # Hammasini bitta tranzaksiyada saqlaymiz
    db.commit()
    db.refresh(new_order)
    return new_order


# 2. Foydalanuvchining o'z buyurtmalari tarixi
@router.get("/my-orders", response_model=List[OrderResponse])
def get_my_orders(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    orders = (
        db.query(Order)
        .filter(Order.user_id == current_user.id)
        .order_by(Order.id.desc())
        .all()
    )
    return orders


# 3. Faqat ADMIN: Barcha buyurtmalarni ko'rish
@router.get("/", response_model=List[OrderResponse])
def get_all_orders(
    db: Session = Depends(get_db), admin: User = Depends(get_current_admin)
):
    orders = db.query(Order).order_by(Order.id.desc()).all()
    return orders
