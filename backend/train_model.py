import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("dataset/heart.csv")

print("Dataset Shape:", df.shape)

# Remove id column if exists
if "id" in df.columns:
    df = df.drop("id", axis=1)
    # Remove dataset column
if "dataset" in df.columns:
    df = df.drop("dataset", axis=1)

# Replace ? with NaN
df = df.replace("?", pd.NA)
print(df.head())
print(df["sex"].unique())
print(df["cp"].unique())
print(df["restecg"].unique())
print(df["slope"].unique())
print(df["thal"].unique())

# Convert all columns to numeric
df["num"] = (df["num"] > 0).astype(int)

# Encode categorical columns
categorical_cols = ["sex", "cp", "restecg", "slope", "thal"]

for col in categorical_cols:
    df[col] = df[col].astype("category").cat.codes

# Convert target column to binary
df["num"] = (df["num"] > 0).astype(int)

# Features and Target
X = df.drop("num", axis=1)
y = df["num"]

print("Features Shape:", X.shape)
print("Feature Columns:")
print(X.columns.tolist())

# Fill missing values
imputer = SimpleImputer(strategy="most_frequent")
X = imputer.fit_transform(X)

# Train Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train Model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# Accuracy
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy:.2f}")

# Save model
with open("model.pkl", "wb") as file:
    pickle.dump(model, file)

print("model.pkl saved successfully")

print("Model Features After Training:", model.n_features_in_)