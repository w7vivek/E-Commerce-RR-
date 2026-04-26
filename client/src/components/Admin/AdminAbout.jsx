import React from 'react'
import '../../style/AboutUs.css';
const AdminAbout = () => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

    return (
        <div>
            <section className="about-page">

                <div className="about-container">

                    {/* Left Side */}
                    <div className="about-card reveal-left">

                        <div className="title-center">
                            <h1 className="fancy-title">
                                About Us
                            </h1>
                        </div>

                        <div className="about-text-box">
                            <p>
                                Welcome to <strong>R.R Stationery</strong>,
                                Ahmedabad's trusted destination for
                                stationery, customised gifts, school
                                supplies and office essentials.
                            </p>
                        </div>

                        <div className="about-text-box">
                            <p>
                                We are committed to delivering quality
                                products at affordable prices with
                                excellent customer service.
                            </p>
                        </div>

                        <div className="about-text-box">
                            <p>
                                Visit our store in Nana Chiloda,
                                Ahmedabad and explore products for
                                students, offices and gifting needs.
                            </p>
                        </div>

                    </div>

                    {/* Right Side */}
                    <div className="review-card reveal-right">

                        <h2 className="review-title">
                            Google Review Summary
                        </h2>

                        <div className="rating-number">
                            4.3
                        </div>

                        <div className="stars">
                            ⭐⭐⭐⭐☆
                        </div>

                        <p className="review-count">
                            (7 Reviews)
                        </p>

                        <div className="rating-bars">

                            <div>
                                <span>5 ★</span>
                                <div className="bar">
                                    <div className="fill fill-5"></div>
                                </div>
                            </div>

                            <div>
                                <span>4 ★</span>
                                <div className="bar">
                                    <div className="fill fill-4"></div>
                                </div>
                            </div>

                            <div>
                                <span>3 ★</span>
                                <div className="bar">
                                    <div className="fill fill-3"></div>
                                </div>
                            </div>

                            <div>
                                <span>2 ★</span>
                                <div className="bar">
                                    <div className="fill fill-2"></div>
                                </div>
                            </div>

                            <div>
                                <span>1 ★</span>
                                <div className="bar">
                                    <div className="fill fill-1"></div>
                                </div>
                            </div>

                        </div>

                        <div className="single-review">

                            <h4>Real talks</h4>

                            <p>
                                Best shop. Every item at reasonable
                                price 💸
                            </p>

                        </div>

                        <div className="single-review">

                            <h4>Hitesh Patel</h4>

                            <p>
                                Nice❤️
                            </p>

                        </div>

                    </div>

                </div>

            </section>
        </div>
    )
}

export default AdminAbout