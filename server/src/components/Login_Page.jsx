import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/LoginPage.css';
import sideImg from '../assets/auth-side.jpg';

const LoginPage = () => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    /* Animation */
    useEffect(() => {

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);

    }, []);

    /* Login Submit */
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const res = await axios.post(
                 `${API}/auth`,
                { email, password }
            );

            console.log(res.data);
            if (email === "admin@workforce.com" && password === "admin123") {
                alert("Login Successful");
                setEmail("");
                setPassword("");

                // sore username
                localStorage.setItem("user", JSON.stringify(res.data.user));

                navigate('/AdminDashBoard');
            }
            else {

                alert("Login Successful");
                /* Clear Inputs */
                setEmail("");
                setPassword("");

                // sore username
                localStorage.setItem("user", JSON.stringify(res.data.user));

                navigate('/UserDashboard');
            }

        } catch (error) {

            console.log(error);

            alert("Invalid Credentials");

        } finally {

            setLoading(false);

        }
    };

    return (
        <section className="auth-section">

            {/* Left Side */}
            <div
                className={`auth-left ${isVisible ? 'is-visible' : ''
                    }`}
            >

                <h1 className="auth-title">
                    Welcome Back
                </h1>

                <p className="auth-subtitle">
                    Login to continue shopping premium
                    stationery, gifts and essentials.
                </p>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "PLEASE WAIT..."
                                : "LOGIN"
                        }
                    </button>

                </form>

                <p className="bottom-link">

                    Don't have account?{" "}

                    <Link to="/registerPage">
                        Register
                    </Link>

                </p>

            </div>

            {/* Right Side */}
            <div className="auth-right">

                <img
                    src={sideImg}
                    alt="Stationery"
                    className="main-auth-img"
                />

                <div className="floating-box">

                    <h3>R.R Stationery</h3>

                    <p>
                        Creative shopping starts here.
                    </p>

                </div>

            </div>

        </section>
    );
};

export default LoginPage;