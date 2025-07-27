from fastapi import Depends,APIRouter
from sqlalchemy.orm import Session
from app.schemas import SubjectCreate
from app.database import get_db
from app import crud, schemas
from app.utils.dependencies import get_current_user
from app.models import User

router = APIRouter(prefix="/subject", tags=["subject"])

@router.post("/")
def create_subject(subject: schemas.SubjectCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return crud.create_subject(db, subject)

@router.get("/")
def get_all_subject(db: Session = Depends(get_db)):
    return crud.get_subjects(db)