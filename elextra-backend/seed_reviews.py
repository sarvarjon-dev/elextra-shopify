from database.connection import SessionLocal
from models.user import User
from models.reviews import Review
from models.product import Product
from models.category import Category

def add_mock_reviews():
    db = SessionLocal()
    try:
        # 1. Bitta test foydalanuvchi yaratamiz
        test_user = User(
            # E'tibor bering: Agar User modelingizda 'name' emas, 'first_name' yoki 
            # 'username' bo'lsa, quyidagi qatorni shunga moslang:
            full_name="Sarvarjon", 
            email="sarvar@example.com",
            hashed_password="hashed_password_123" # Hozircha oddiy tekst yozib turamiz
        )
        db.add(test_user)
        db.commit()
        db.refresh(test_user) # Yaratilgan userni ID sini olish uchun yangilaymiz
        print(f"✅ User yaratildi: ID={test_user.id}")

        # 2. ID=1 bo'lgan mahsulotga 2 ta izoh qo'shamiz
        review1 = Review(
            rating=5,
            comment="Haqiqatan ham ajoyib mahsulot ekan! Dizayni va ishlashi tez. Hammaga tavsiya qilaman.",
            user_id=test_user.id,
            product_id=1  # ID si 1 bo'lgan birinchi mahsulotga ulanadi
        )
        
        review2 = Review(
            rating=4,
            comment="Yaxshi, narxiga arziydi. Faqat yetkazib berish biroz kechikdi.",
            user_id=test_user.id,
            product_id=1
        )
        
        db.add_all([review1, review2])
        db.commit()
        print("✅ Izohlar muvaffaqiyatli qo'shildi!")

    except Exception as e:
        print(f"❌ Xatolik yuz berdi: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    add_mock_reviews()