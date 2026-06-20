import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    const isLoggedIn = false;

    return (
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

                {!isLoggedIn ? (
                    <>
                        <li>
                            <li><Link to="/register">Register</Link></li>

                        </li>

                        <li>
                            <li><Link to="/login">Login</Link></li>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/prediction">Predict</Link>
                        </li>

                        <li>
                            <button className="logout-btn">
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;