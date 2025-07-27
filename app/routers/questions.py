from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud
from app.database import get_db
from app.schemas import QuestionCreate

router = APIRouter(prefix="/questions", tags=["questions"])

@router.post("/")
def create_question(question_in: QuestionCreate, db: Session = Depends(get_db)):
    return crud.create_question(db, question_in)

@router.get("/")
def get_question(db: Session = Depends(get_db)):
    return crud.get_questions(db)
