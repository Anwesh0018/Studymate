from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from fastapi import Body
from passlib.context import CryptContext
from app import models, schemas
from app.models import User
from app.schemas import UserShow
from app.database import get_db
from app.utils import token
from app.schemas import ProfilePicUpdate
from app.utils.dependencies import get_current_user
from app.otp_store import save_otp, verify_otp
from app.schemas import PhoneNumber,OTPVerify
import httpx

router = APIRouter(prefix="/users", tags=["Users"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def send_sms(phone: str, otp: str):
    url = "https://www.fast2sms.com/dev/bulkV2"
    payload = {
        "route": "q",
        "message": f"Your OTP is {otp}",
        "language": "english",
        "flash": "0",
        "numbers": phone,
    }
    headers = {
        "authorization": "K3eRj8tF0c2bZxq7Ly1BoPuMV6ID9SwliArWvhJNzQgGH4msEUK5bhOJzMlQ8kWsrqL9IaeY3ZEj6ypx",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded"
    }

    with httpx.Client() as client:
        res = client.post(url, data=payload, headers=headers)
        print("📨 SMS Response:", res.status_code, res.text)

@router.post("/", response_model=schemas.UserShow)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if email or username already exists
    existing_user = db.query(models.User).filter(
        (models.User.email == user.email) | (models.User.username == user.username)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email or Username already registered")

    # Hash the password
    hashed_pw = pwd_context.hash(user.password)

    # Create the new user
    new_user = models.User(
        email=user.email,
        username=user.username,
        password=hashed_pw
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.get("/me", response_model=UserShow)
def read_logged_in_user(current_user: User = Depends(get_current_user)):
    return current_user


@router.post("/update-profile-pic", response_model=None)
def update_profile_pic(
    data: ProfilePicUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    current_user.profile_pic = data.profile_pic
    db.commit()
    return {"message": "Profile picture updated successfully"}

@router.post("/send-otp")
def send_otp(data: PhoneNumber):
    otp = save_otp(data.phone)
    send_sms(data.phone, otp)  # ✅ ACTUALLY SEND THE OTP
    print(f"📲 OTP sent to {data.phone}: {otp}")
    return {"success": True, "message": "OTP sent"}

@router.post("/verify-otp")
def verify(data: OTPVerify):
    if verify_otp(data.phone, data.otp):
        return {"valid": True}
    return {"valid": False}