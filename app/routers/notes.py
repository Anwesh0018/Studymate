from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import NoteCreate
from app.database import get_db
from app import crud

router = APIRouter(prefix="/notes", tags=["Notes"])

@router.post("/")
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    return crud.create_note(db, note)

@router.get("/")
def get_notes(db: Session = Depends(get_db)):
    return crud.get_notes(db)