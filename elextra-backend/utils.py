from passlib.context import CryptContext
import os
import jwt
from datetime import datetime, timedelta, timezone

jwt_key = os.getenv("JWT_SECRET_KEY")
jwt_expire_minutes = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES_MINUTES"))
Algorithm = "HS256"


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=jwt_expire_minutes)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, jwt_key, algorithm=Algorithm)

    return encoded_jwt


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
