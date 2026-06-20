from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, Session, declarative_base

import joblib
import numpy as np



# ==========================
# DATABASE CONFIG
# ==========================

DATABASE_URL = "mysql+pymysql://root:root123@localhost:3306/heartdb"

engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# ==========================
# USER TABLE
# ==========================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    password = Column(String(100))

Base.metadata.create_all(bind=engine)

# ==========================
# LOAD ML MODEL
# ==========================

model = joblib.load("model.pkl")
print("Model Features:", model.n_features_in_)

# ==========================
# FASTAPI APP
# ==========================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# DB SESSION
# ==========================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==========================
# Pydantic Models
# ==========================

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class PredictionRequest(BaseModel):
    age: float
    sex: float
    cp: float
    trestbps: float
    chol: float
    fbs: float
    restecg: float
    thalach: float
    exang: float
    oldpeak: float
    slope: float
    ca: float
    thal: float

# ==========================
# HOME API
# ==========================

@app.get("/")
def home():
    return {"message": "FastAPI is running 🚀"}

# ==========================
# REGISTER API
# ==========================

@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }

# ==========================
# LOGIN API
# ==========================

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if existing_user.password != user.password:
        raise HTTPException(status_code=401, detail="Invalid password")

    return {
        "message": "Login successful",
        "user_id": existing_user.id,
        "name": existing_user.name
    }

# ==========================
# HEART DISEASE PREDICTION API
# ==========================

@app.post("/predict")
def predict(data: PredictionRequest):

    try:
        # ✅ Correct feature order (NO extra bracket)
        features = np.array([[
            float(data.age),
            float(data.sex),
            float(data.cp),
            float(data.trestbps),
            float(data.chol),
            float(data.fbs),
            float(data.restecg),
            float(data.thalach),
            float(data.exang),
            float(data.oldpeak),
            float(data.slope),
            float(data.ca),
            float(data.thal)
        ]])

        prediction = model.predict(features)[0]

        # probability safe handling
        try:
            probability = model.predict_proba(features)[0][1]
            risk = round(float(probability) * 100, 2)
        except:
            risk = 75.0 if int(prediction) == 1 else 15.0

        result = "Heart Disease Detected" if int(prediction) == 1 else "No Heart Disease"

        return {
            "prediction": int(prediction),
            "result": result,
            "risk": risk
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==========================
# RUN APP
# ==========================

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000,
        reload=True
    )