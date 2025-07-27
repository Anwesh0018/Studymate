from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Subject(Base):
    __tablename__ = 'subject'
    id = Column(Integer, primary_key=True,index=True)
    name = Column(String,unique=True,nullable=False)

    notes = relationship("Note",back_populates="subject")
    questions = relationship("Question",back_populates="subject")

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True,index=True)
    username = Column(String,unique=True,nullable=False)
    email = Column(String,nullable=False)
    password = Column(String,nullable=False)
    profile_pic = Column(Text, nullable=True)

class Note(Base):
    __tablename__ = 'note'
    id = Column(Integer, primary_key=True,index=True)
    title = Column(String,unique=True,nullable=False)
    content = Column(Text,nullable=False)
    subject_name = Column(String, ForeignKey('subject.name'))

    subject = relationship("Subject",back_populates="notes")

class Question(Base):
    __tablename__ = 'question'
    id = Column(Integer, primary_key=True,index=True)
    question_text = Column(Text,nullable=False)
    option_a = Column(String,nullable=False)
    option_b = Column(String,nullable=False)
    option_c = Column(String,nullable=False)
    option_d = Column(String,nullable=False)
    correct_option = Column(String,nullable=False)
    explanation = Column(Text)

    subject_id = Column(Integer, ForeignKey('subject.id'))
    subject = relationship("Subject",back_populates="questions")
