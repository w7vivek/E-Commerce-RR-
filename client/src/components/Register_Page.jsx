import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../style/LoginPage.css';
import sideImg from '../assets/auth-side2.jpg';

const Register_Page = () => {
    const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        password: ""
    });

    /* Animation */
    useEffect(() => {

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);

    }, []);

    /* Input Handler */
    const handleInputData = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    /* Submit */
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await axios.post(
                 `${API}/registerData`,
                formData
            );

            console.log(res.data);

            alert("Registration Successful");

            setFormData({
                firstName: "",
                email: "",
                password: ""
            });

            navigate('/login');

        } catch (error) {

            console.log(error);

            alert("Registration Failed");

        } finally {

            setLoading(false);

        }
    };

    return (
        <section className="auth-section">

            {/* Left Side */}
            <div
                className={`auth-left ${
                    isVisible ? 'is-visible' : ''
                }`}
            >

                <h1 className="auth-title">
                    Create Account
                </h1>

                <p className="auth-subtitle">
                    Join R.R Stationery and enjoy
                    premium shopping experience.
                </p>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="firstName"
                        placeholder="Full Name"
                        value={formData.firstName}
                        onChange={handleInputData}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleInputData}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Create Password"
                        value={formData.password}
                        onChange={handleInputData}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "PLEASE WAIT..."
                                : "REGISTER"
                        }
                    </button>

                </form>

                <p className="bottom-link">

                    Already have account?{" "}

                    <Link to="/login">
                        Login
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
                        Quality products at affordable prices.
                    </p>

                </div>

            </div>

        </section>
    );
};

export default Register_Page;