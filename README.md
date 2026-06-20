# Heart Disease Prediction System
A machine learning-based web application that predicts the likelihood of heart disease using patient health parameters and provides instant prediction results through an interactive user interface.

## 📌 Project Overview
Heart Disease Prediction System is an intelligent healthcare application designed to assist in the early detection of heart disease. The system uses machine learning algorithms trained on medical datasets to analyze patient information and predict the risk of heart disease.

The application provides a user-friendly interface where users can enter health-related details and receive real-time prediction results, helping support awareness and preventive healthcare.

## 🚀 Features

### 👤 User Features
* User-friendly prediction interface
* Real-time heart disease prediction
* Input validation for medical parameters
* Instant prediction results
* Interactive dashboard
* Responsive design
* Secure API integration

### 🤖 Machine Learning Features
* Trained machine learning model
* Medical data preprocessing
* Feature scaling and transformation
* Accurate disease prediction
* Model serialization using Pickle
* Fast prediction response

## 🛠️ Technology Stack

### Frontend
* React.js
* CSS3
* Axios
* Vite

### Backend
* FastAPI
* Python

### Machine Learning
* Scikit-Learn
* Pandas
* NumPy
* Pickle

## ⚙️ Installation & Setup

### Backend Setup

```bash
cd backend
pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```bash
http://localhost:8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

## 📊 Input Parameters
The model uses various medical parameters such as:
* Age
* Sex
* Chest Pain Type
* Resting Blood Pressure
* Cholesterol
* Fasting Blood Sugar
* Resting ECG
* Maximum Heart Rate
* Exercise Induced Angina
* ST Depression
* Slope of Peak Exercise ST Segment
* Number of Major Vessels
* Thalassemia

## 🔐 Key Features
* Machine Learning-based prediction
* FastAPI REST APIs
* Real-time results
* Responsive UI
* Data validation
* Scalable architecture

## 📈 Project Highlights
* End-to-end Machine Learning project
* Full-stack web application
* Healthcare prediction system
* Real-time disease risk assessment
* Integrated frontend and backend
* Production-ready architecture

## 👩‍💻 Project Details
Project Type: Machine Learning Web Application
Domain: Healthcare & Artificial Intelligence
Year: 2026

## 📄 License
This project is developed for educational and learning purposes.
