import React, { useState } from "react";
import "../styles/Prediction.css";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

function Prediction() {
    const [formData, setFormData] = useState({
        age: "",
        sex: "",
        cp: "",
        trestbps: "",
        chol: "",
        fbs: "",
        restecg: "",
        thalach: "",
        exang: "",
        oldpeak: "",
        slope: "",
        ca: "",
        thal: "",
    });

    const [result, setResult] = useState("");
    const [riskPercentage, setRiskPercentage] = useState(0);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Validation
        for (let key in formData) {
            if (formData[key] === "" || formData[key] === null) {
                alert("Please fill all fields properly");
                return;
            }
        }

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/predict",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        age: Number(formData.age),
                        sex: Number(formData.sex),
                        cp: Number(formData.cp),
                        trestbps: Number(formData.trestbps),
                        chol: Number(formData.chol),
                        fbs: Number(formData.fbs),
                        restecg: Number(formData.restecg),
                        thalach: Number(formData.thalach),
                        exang: Number(formData.exang),
                        oldpeak: Number(formData.oldpeak),
                        slope: Number(formData.slope),
                        ca: Number(formData.ca),
                        thal: Number(formData.thal),
                    }),
                }
            );
            const data = await response.json();

            console.log("Response:", data);

            if (!response.ok) {
                alert(data.detail || "Prediction failed");
                return;
            }

            setResult(data.result);
            setRiskPercentage(data.risk);

            // remaining code...
        } catch (error) {
            console.log(error);
        }
    };
    const chartData = [
        {
            name: "Risk",
            value: riskPercentage,
        },
        {
            name: "Safe",
            value: 100 - riskPercentage,
        },
    ];

    return (
        <div className="prediction-page">
            <div className="overlay">
                <div className="prediction-card">
                    <h1>❤️ Heart Disease Prediction</h1>

                    <p>
                        Fill all patient information to predict risk
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">

                            <input name="age" type="number" placeholder="Age" onChange={handleChange} />

                            <select name="sex" onChange={handleChange}>
                                <option value="">Gender</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>

                            <input name="cp" type="number" placeholder="Chest Pain Type" onChange={handleChange} />

                            <input name="trestbps" type="number" placeholder="Blood Pressure" onChange={handleChange} />

                            <input name="chol" type="number" placeholder="Cholesterol" onChange={handleChange} />

                            <select name="fbs" onChange={handleChange}>
                                <option value="">FBS</option>
                                <option value="1">120</option>
                                <option value="0">Normal</option>
                            </select>

                            <select name="restecg" onChange={handleChange}>
                                <option value="">ECG</option>
                                <option value="0">Normal</option>
                                <option value="1">Abnormal</option>
                                <option value="2">Hypertrophy</option>
                            </select>

                            <input name="thalach" type="number" placeholder="Max Heart Rate" onChange={handleChange} />

                            <select name="exang" onChange={handleChange}>
                                <option value="">Exercise Angina</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>

                            <input name="oldpeak" type="number" step="0.1" placeholder="ST Depression" onChange={handleChange} />

                            <select name="slope" onChange={handleChange}>
                                <option value="">Slope</option>
                                <option value="0">Upsloping</option>
                                <option value="1">Flat</option>
                                <option value="2">Downsloping</option>
                            </select>

                            <input name="ca" type="number" placeholder="Major Vessels" onChange={handleChange} />

                            <select name="thal" onChange={handleChange}>
                                <option value="">Thalassemia</option>
                                <option value="1">Normal</option>
                                <option value="2">Fixed</option>
                                <option value="3">Reversible</option>
                            </select>

                        </div>

                        <button className="predict-btn" type="submit">
                            Predict Disease
                        </button>
                    </form>

                    {result && (
                        <div className="result-box">

                            <h2>{result}</h2>

                            <h3>Risk: {riskPercentage}%</h3>

                            <div className="meter">
                                <div
                                    className="meter-fill"
                                    style={{ width: `${riskPercentage}%` }}
                                ></div>
                            </div>

                            <PieChart width={300} height={250}>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="value"
                                    label
                                >
                                    <Cell fill="#ff1744" />
                                    <Cell fill="#00c853" />
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Prediction;