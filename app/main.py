from fastapi import FastAPI
from app import models
from app.database import engine
from app.routers import user,auth,subject,questions,notes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(subject.router)
app.include_router(questions.router)
app.include_router(notes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://10.1006.111.177:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
