import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    return (
        <>
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">
                    ❤️ Heart Disease Prediction
                </div>

                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/about">About</Link>
                    </li>

                    <li>
                        <Link to="/register">Register</Link>
                    </li>

                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>

            {/* Hero Section */}
            <div className="home">
                <div className="overlay">
                    <div className="hero-content">
                        <h1>
                            AI Powered <span>Heart Disease</span> Prediction
                        </h1>

                        <p>
                            Predict heart disease risk using advanced machine learning
                            algorithms and patient health parameters.
                        </p>

                        <div className="hero-buttons">
                            <Link to="/register" className="btn-primary">
                                Get Started
                            </Link>

                            <Link to="/about" className="btn-secondary">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;