import React from 'react';
import '../style/Footer.css';
import {
    FaInstagram,
    FaFacebookF,
    FaTwitter
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer-section">

            <h2 className="footer-title">
                Let’s be the change 🌍 🌱
            </h2>

            <p className="footer-address">
                <b> R.R STATIONERY </b><br />
                10, Shrinand Flora, NEW SHAHIBHAG,<br />
                opp. SHAYONA FARM,<br />
                Nana Chiloda, Ahmedabad,<br />
                Gujarat 382330 <br />
                📱 +91 97232 38047
            </p>

            <div className="footer-icons">

                <a href="#">
                    <FaTwitter />
                </a>

                <a href="#">
                    <FaFacebookF />
                </a>

                <a href="https://www.instagram.com/__rr__stationery__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                    <FaInstagram />
                </a>

            </div>

            <div className="map-container">

                <iframe
                    title="RR Stationery Map"
                    src="https://www.google.com/maps?q=10%20Shrinand%20Flora%20NEW%20SHAHIBHAG%20Ahmedabad&output=embed"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>

            </div>

        </footer>
    );
};

export default Footer;