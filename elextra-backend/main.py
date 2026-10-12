from fastapi import FastAPI, Depends
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

app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(products.router)
app.include_router(review.router)
app.include_router(orders.router)


@app.get("/")
def home():
    return {"status": "success", "message": "elextra backend ishlayapti!!"}


@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    try:
        db.execute(text("Select 1"))
        return {"status": "success", "message": "database ulandi!!!"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
