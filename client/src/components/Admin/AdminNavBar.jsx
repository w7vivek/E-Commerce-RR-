import React, { useState } from 'react';
import { Link, Outlet,useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../../style/NavBar.css';
import loginLogo from '../../assets/login_logo.png';
import Footer from '../Footer';

const AdminNavBar = () => {
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL || "http://localhost:5000";


    const [menuOpen, setMenuOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"))
    
     const logout = () => {

        localStorage.removeItem("user");

        navigate('/');

    };

    return (
        <>
            <header className="navbar">

                <div className="nav-container">

                    <Link to="/adminDashboard" className="logo-box">
                        <img src={loginLogo} alt="logo" className="nav-logo" />
                        <span>R.R Stationery</span>
                    </Link>

                    <div>
                        <h1>Hello {user.firstName}</h1>
                    </div>

                    {/* Desktop Links */}
                    <nav className="nav-links">
                        <Link to="/adminDashboard/AdminAbout">About</Link>
                        <Link to="/adminDashboard/AdminProduct">Products</Link>
                        {/* <Link to='/adminDashboard/UserCart'>Cart</Link> */}
                        <button onClick={logout} className='nav-button'>LogOut</button>
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

                    <Link to="/adminDashboard" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/adminDashboard/AdminProduct" onClick={() => setMenuOpen(false)}>Products</Link>
                    <Link to="/adminDashboard/AdminAbout" onClick={() => setMenuOpen(false)}>About</Link>
                    <button onClick={logout} className='nav-button'>LogOut</button>

                </div>

            </header>

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default AdminNavBar;