import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../style/AdminDashboard.css';

const AdminDashboard = () => {

    const [customerData, setCustomerData] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);
    /* Fetch Data */
    const fetchData = async () => {

        try {

            const users = await axios.get(
                'http://localhost:5000/buyList-customerData'
            );

            const carts = await axios.get(
                'http://localhost:5000/allCartData'
            );

            setCustomerData(users.data);
            setCartData(carts.data);

            setLoading(false);

        } catch (error) {

            console.log(error);
            setLoading(false);

        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => { 
        setTotalUsers( customerData.length );
    }, [customerData]);

    /* Group Cart By User */
    const groupedCart = cartData.reduce((acc, item) => {

        if (!acc[item.userEmail]) {
            acc[item.userEmail] = [];
        }

        acc[item.userEmail].push(item);

        return acc;

    }, {});

    return (

        <div className="admin-page">

            <h1 className="admin-title">
                Admin Dashboard
            </h1>
            <div className="admin-summary-box"> <h2> Total Customers </h2> <p> {totalUsers} </p> </div>

            {loading ? (

                <h2>Loading...</h2>

            ) : (

                <div>

                    {customerData.map((user) => (

                        <div
                            key={user._id}
                            className="purchase-box"
                        >

                            <h2>{user.firstName}</h2>

                            <p>{user.email}</p>

                            <h3>Purchases</h3>

                            {groupedCart[user.email]?.length > 0 ? (

                                groupedCart[user.email].map((item) => (

                                    <div
                                        key={item._id}
                                        className="product-line"
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.productName}
                                            className="cart-img"
                                        />

                                        <span>
                                            {item.productName}
                                        </span>

                                        <span>
                                            Qty: {item.quantity}
                                        </span>

                                        <span>
                                            ₹ {item.total}
                                        </span>

                                    </div>

                                ))

                            ) : (

                                <p>No Purchase</p>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
};

export default AdminDashboard;