from sqlalchemy import Column, String, Integer, ForeignKey, Text, Float, JSON, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database.connection import Base


class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    sku = Column(String(50), unique=True, nullable=False)
    name = Column(String(255), unique=True, index=True, nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    brand = Column(String(100), nullable=True)
    description = Column(Text, nullable=False)
    stock_quantity = Column(Integer, default=0, nullable=False)

    price = Column(Float, nullable=False)
    discount_price = Column(Float, nullable=True)
    discount_percent = Column(Integer, nullable=True)

    # Images
    main_image = Column(String(255), nullable=True)
    images = Column(JSON, nullable=True)

    specifications = Column(JSON, nullable=True)

    # Statistika (Dizayndagi yulduzcha, ko'rishlar, sotilganlar)
    rating = Column(Float, default=0.0)
    reviews_count = Column(Integer, default=0)
    sold_count = Column(Integer, default=0)
    views_count = Column(Integer, default=0)

    # Kategoriyaga bog'lash (Foreign Key)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    # Aloqa (Category modeli bilan oson bog'lanish uchun)
    category = relationship("Category", back_populates="products")
    reviews = relationship("Review", back_populates="product", cascade="all, delete-orphan")

    # Vaqt hisobi
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
