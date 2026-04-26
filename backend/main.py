import sys
import os
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import bcrypt

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import models, schemas, database, ai_service
from database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="ArogyaMitra AI Backend")

@app.get("/")
def read_root():
    return {"message": "Welcome to ArogyaMitra AI Backend API"}


# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

@app.on_event("startup")
def startup_event():
    db = database.SessionLocal()
    # Seed data for schemes and centers if empty
    if not db.query(models.GovernmentScheme).first():
        schemes = [
            models.GovernmentScheme(name="Ayushman Bharat", eligibility="Low income families", benefits="Health cover of Rs. 5 lakhs per family per year"),
            models.GovernmentScheme(name="Janani Suraksha Yojana", eligibility="Pregnant women in BPL households", benefits="Cash assistance for institutional delivery"),
            models.GovernmentScheme(name="Arogya Lakshmi", eligibility="Pregnant and lactating women", benefits="Nutritious meals provided at Anganwadi centers")
        ]
        db.add_all(schemes)
    
    if not db.query(models.HealthCenter).first():
        centers = [
            models.HealthCenter(name="Primary Health Center - Bhadrachalam", location="Bhadrachalam, Telangana", contact="9876543210"),
            models.HealthCenter(name="Community Health Center - Paderu", location="Paderu, Andhra Pradesh", contact="9876543211"),
            models.HealthCenter(name="District Hospital - Araku", location="Araku Valley, Andhra Pradesh", contact="9876543212")
        ]
        db.add_all(centers)
    
    db.commit()
    db.close()

@app.post("/signup", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/login", response_model=schemas.Token)
def login(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    
    # In a real app, generate a JWT. Returning a dummy token here.
    return {"access_token": user.username + "_token", "token_type": "bearer"}

@app.post("/health-query")
def health_query(query: schemas.QueryInput):
    advice = ai_service.process_health_query(query.text, query.language)
    return {"response": advice}

@app.get("/schemes", response_model=list[schemas.SchemeResponse])
def get_schemes(db: Session = Depends(database.get_db)):
    return db.query(models.GovernmentScheme).all()

@app.get("/nearby-centers", response_model=list[schemas.CenterResponse])
def get_centers(db: Session = Depends(database.get_db)):
    return db.query(models.HealthCenter).all()

from fastapi.responses import StreamingResponse
from gtts import gTTS
import io

@app.get("/tts")
def text_to_speech(text: str, lang: str):
    # Using gTTS on backend bypasses all frontend CORS/Autoplay limits
    tts = gTTS(text=text, lang=lang)
    fp = io.BytesIO()
    tts.write_to_fp(fp)
    fp.seek(0)
    return StreamingResponse(fp, media_type="audio/mpeg")
