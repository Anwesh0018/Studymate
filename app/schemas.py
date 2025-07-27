from pydantic import BaseModel
from typing import Optional

# -------- User --------
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserShow(BaseModel):
    id: int
    username: str
    email: str
    profile_pic: Optional[str]

    model_config = {
        "from_attributes": True
    }

class ProfilePicUpdate(BaseModel):
    profile_pic: str

# -------- Login --------

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# -------- Subject --------
class SubjectBase(BaseModel):
    id: int
    name: str

class SubjectCreate(SubjectBase):
    name: str

class SubjectOut(SubjectBase):
    id: int
    model_config = {
        "from_attributes": True
    }

# -------- Note --------
class NoteBase(BaseModel):
    title: str
    content: str
    subject_id: int

class NoteCreate(NoteBase):
    title: str
    content: str
    subject_name: str

class NoteOut(NoteBase):
    subject_name: str
    model_config = {
        "from_attributes": True
    }
# -------- Question --------
class QuestionBase(BaseModel):
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_option: str
    explanation: Optional[str]
    subject_id: int

class QuestionCreate(BaseModel):
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_option: str
    explanation: str | None = None
    subject_id: int

class QuestionOut(BaseModel):
    id: int
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_option: str
    explanation: str | None = None
    subject_id: int

    model_config = {
        "from_attributes":  True
    }

class PhoneNumber(BaseModel):
    phone: str

class OTPVerify(BaseModel):
    phone: str
    otp: str

class TokenRefresh(BaseModel):
    refresh_token: str