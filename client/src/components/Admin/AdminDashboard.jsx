import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../style/AdminDashboard.css';

const AdminDashboard = () => {

    const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const [customerData, setCustomerData] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);

    const fetchData = async () => {
        try {
            const users = await axios.get(`${API}/buyList-customerData`);
            const carts = await axios.get(`${API}/allCartData`);
            setCustomerData(users.data);
            setCartData(carts.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);
    useEffect(() => { setTotalUsers(customerData.length); }, [customerData]);

    const groupedCart = cartData.reduce((acc, item) => {
        if (!acc[item.userEmail]) acc[item.userEmail] = [];
        acc[item.userEmail].push(item);
        return acc;
    }, {});

    return (
        <div className="admin-page">

            <div className="admin-top">
                <h1 className="admin-title">
                    Admin <span>Dashboard</span>
                </h1>
                <div className="admin-summary-box">
                    <h2>Total Customers</h2>
                    <p>{totalUsers}</p>
                </div>
            </div>

            {loading ? (

                <h2 className="loading-text">Loading...</h2>

            ) : (

                <div className="customer-list">
                    {customerData.map((user) => (
                        <div key={user._id} className="purchase-box">

                            <h2>{user.firstName}</h2>
                            <p>{user.email}</p>
                            <h3>Purchases</h3>

                            {groupedCart[user.email]?.length > 0 ? (
                                groupedCart[user.email].map((item) => (
                                    <div key={item._id} className="product-line">
                                        <img
                                            src={item.image}
                                            alt={item.productName}
                                            className="cart-img"
                                        />
                                        <span>{item.productName}</span>
                                        <span>Qty: {item.quantity}</span>
                                        <span>₹ {item.total}</span>
                                    </div>
                                ))
                            ) : (
                                <p>No purchases yet</p>
                            )}

                        </div>
                    ))}
                </div>

            )}

        </div>
    );
};

export default AdminDashboard;