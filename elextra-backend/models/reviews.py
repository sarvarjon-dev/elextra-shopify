from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database.connection import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)
    rating = Column(Integer, nullable=False)  # 1 dan 5 gacha baho
    comment = Column(Text, nullable=True)  # Foydalanuvchi fikri

    # Bog'lanishlar (Foreign Keys)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)

    # Aloqalar (Relationship)
    user = relationship("User")
    product = relationship("Product")

    # Yaratilgan vaqt
    created_at = Column(DateTime(timezone=True), server_default=func.now())
