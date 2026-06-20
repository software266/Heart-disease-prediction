import Navbar from "../components/Navbar";
import "../styles/About.css";

function About() {
    return (
        <>
            <Navbar />

            <div className="about-container">
                <div className="about-content">

                    <h1>About Heart Disease Prediction</h1>

                    <p>
                        Heart Disease Prediction System is an AI-powered healthcare
                        application designed to predict the risk of heart disease
                        using Machine Learning algorithms.
                    </p>

                    <p>
                        This system analyzes important health parameters such as
                        age, cholesterol level, blood pressure, heart rate, and
                        other medical factors to provide accurate predictions.
                    </p>

                    <div className="features">

                        <div className="feature-card">
                            <h3>🤖 AI Powered</h3>
                            <p>
                                Uses Machine Learning algorithms for accurate
                                disease prediction.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>❤️ Healthcare Focused</h3>
                            <p>
                                Helps identify heart disease risk based on
                                patient health data.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>📊 Data Analysis</h3>
                            <p>
                                Analyzes multiple medical parameters
                                for better prediction results.
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default About;