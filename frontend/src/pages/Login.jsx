import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Login.css";
import API from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        try {
            const res = await API.post("/login", {
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem(
                "user",
                JSON.stringify(res.data)
            );

            alert("Login Successful");

            navigate("/prediction");

        } catch (error) {
            console.log(error);

            if (error.response) {
                alert(error.response.data.detail);
            } else {
                alert("Login Failed");
            }
        }
    };

    return (
        <>
            <Navbar />

            <div className="login-container">
                <div className="overlay"></div>

                <div className="login-card">
                    <h1>Heart Disease Prediction</h1>
                    <h3>Welcome Back</h3>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button
                        className="login-btn"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;