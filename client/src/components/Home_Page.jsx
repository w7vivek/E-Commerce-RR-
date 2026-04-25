import React from 'react';
import '../style/HomePage.css';
import hero1 from '../assets/hero-main.jpg';
import hero2 from '../assets/hero-small.png';
import { Link } from 'react-router-dom';

const Home_Page = () => {
    return (
        <section className="hero-section">

            <div className="hero-left">

                <h1 className="hero-title">
                    R.R <br /> Stationery
                </h1>

                <p className="hero-subtitle">
                    Welcome to the home of premium stationery,
                    school essentials and creative shopping.
                </p>

                <Link className="hero-btn" to='/product'>
                    SHOP OUR PRODUCTS
                </Link>

            </div>

            <div className="hero-right">

                <img
                    src={hero1}
                    alt="Main Hero"
                    className="hero-main-img"
                    loading="eager"
                    width="520"
                    height="700"
                />

                <img
                    src={hero2}
                    alt="Small Hero"
                    className="hero-small-img"
                    loading="eager"
                    width="520"
                    height="700"
                />

            </div>

        </section>
    );
};

export default Home_Page;