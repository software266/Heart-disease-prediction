import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Register.css";
import API from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        try {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const res = await API.post("/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            alert(res.data.message);

            if (res.data.message === "User registered successfully") {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            alert("Registration Failed");
        }
    };

    return (
        <>
            <Navbar />

            <div className="register-container">
                <div className="overlay"></div>

                <div className="register-card">
                    <h1>Heart Disease Prediction</h1>
                    <h3>Create Account</h3>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                    />

                    <button onClick={handleRegister}>
                        Register
                    </button>

                    <p>
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;