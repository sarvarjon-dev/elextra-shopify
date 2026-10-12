from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from routers import auth, categories, products, review, orders

# Baza va modellarni import qilamiz
from database.connection import Base, engine, get_db
import models.user
import models.product
import models.category
import models.reviews
import models.order

Base.metadata.create_all(bind=engine)


app = FastAPI(title="Elextra E-Commerce Api")

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_headers=["*"],
    allow_methods=["*"],
)

app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(products.router)
app.include_router(review.router)
app.include_router(orders.router)
