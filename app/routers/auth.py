from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.database import get_db
from app.models import User
from sqlalchemy import or_
from app.utils import token
from app.utils.hash import pwd_context
from app.schemas import TokenRefresh

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    #Now using actual username
    user = db.query(User).filter(or_(User.username == form_data.username,User.email == form_data.username)).first()

    if not user or not pwd_context.verify(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    payload = {"sub": user.username}  # Optional: you can include username or email

    access_token = token.create_access_token(payload)
    refresh_token = token.create_refresh_token(payload)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "name": user.username,
            "email": user.email,
            "profilePic": user.profile_pic,
        }
    }

@router.post("/refresh-token")
def refresh_access_token(data: TokenRefresh, db: Session = Depends(get_db)):
    payload = token.verify_token(data.refresh_token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    user_email = payload.get("sub")
    if not user_email:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_access_token = token.create_access_token({"sub": user.email})

    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }