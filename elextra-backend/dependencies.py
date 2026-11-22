import jwt
from fastapi import Depends, HTTPException, status, Request
from sqlalchemy.orm import Session

from database.connection import get_db
from models.user import User
from utils import jwt_key, Algorithm

def get_current_user(
        request: Request,
    db: Session = Depends(get_db),
) -> User:
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='token not found')

    try:
        # Tokenni ochib ko'ramiz (decode)
        payload = jwt.decode(token, jwt_key, algorithms=[Algorithm])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail='Token expired')
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail='cannot verify token')

    # Token ichidagi ID orqali bazadan foydalanuvchini topamiz
    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise HTTPException(status_code=401, detail='User not found')

    return user


def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="in order to continue this action,admin role is required",
        )
    return current_user
