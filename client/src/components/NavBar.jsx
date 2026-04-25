import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../style/NavBar.css';
import loginLogo from '../assets/login_logo.png';
import Footer from './Footer';

const NavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="navbar">

                <div className="nav-container">

                    <Link to="/" className="logo-box">
                        <img src={loginLogo} alt="logo" className="nav-logo" />
                        <span>R.R Stationery</span>
                    </Link>

                    {/* Desktop Links */}
                    <nav className="nav-links">

                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/product">Products</Link>
                        <Link to="/about">About</Link>

                    </nav>

                    {/* Mobile Icon */}
                    <div
                        className="menu-icon"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </div>

                </div>

                {/* Mobile Menu */}
                <div className={menuOpen ? "mobile-menu active" : "mobile-menu"}>

                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                    <Link to="/product" onClick={() => setMenuOpen(false)}>Products</Link>
                    <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

                </div>

            </header>

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default NavBar;