from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
from models.user import User
from schemas.user import UserCreate, UserResponse, Token, UserLogin
from utils import get_password_hash, verify_password, create_access_token
from dependencies import get_current_user, get_current_admin

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=201)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="This email has already existed!")

    hashed_pwt = get_password_hash(user_data.password)

    new_user = User(
        full_name=user_data.full_name, email=user_data.email, hashed_password=hashed_pwt
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()

    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            detail="email or password incorrect",
            headers={"www-Authenticate": "Bearer"},
            status_code=401,
        )

    token_payload = {"sub": str(user.id), "email": user.email, "role": user.role}

    access_token = create_access_token(data=token_payload)

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserResponse)
def get_my_profile(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/only_admin")
def test_admin_route(admin: User = Depends(get_current_admin)):
    return {"status": "success", "message": f"Xush kelibsiz Admin, {admin.full_name}!"}
