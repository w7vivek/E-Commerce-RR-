import React, {
    useState,
    useEffect
} from 'react';

import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import '../../style/Cart.css';

const UserCart = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    /* User Details */
    const [userData, setUserData] =
        useState({
            address: "",
            phone: ""
        });

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    /* Fetch Cart */
    const fetchCart = async () => {

        try {

            const res = await axios.get(
                `http://localhost:5000/cart/${user.email}`
            );

            if (Array.isArray(res.data)) {

                setCart(res.data);

            } else {

                setCart([]);

            }

            setLoading(false);

        } catch (error) {

            console.log(
                "Cart Error:",
                error
            );

            setLoading(false);

        }

    };

    /* Delete */
    const handleDelete =
        async (id) => {

            try {

                await axios.delete(
                    `http://localhost:5000/deleteProduct/${id}`
                );

                const updateList =
                    cart.filter(
                        (item) =>
                            item._id !== id
                    );

                setCart(updateList);

            } catch (error) {

                console.log(error);

            }

        };

    /* Input Change */
    const handleChange = (e) => {

        setUserData({
            ...userData,
            [e.target.name]:
                e.target.value
        });

    };

    useEffect(() => {
        fetchCart();
    }, []);

    /* Total */
    const total = cart.reduce(
        (sum, item) =>
            sum + item.total,
        0
    );

    const handleCheckout =
        async () => {

            try {

                await axios.post(
                    'http://localhost:5000/saveAddress',
                    {
                        email: user.email,
                        address: userData.address,
                        phone: userData.phone
                    }
                );

                navigate('/UserDashboard/Payment');

                

            } catch (error) {

                console.log(error);

            }

        };

    return (

        <div className="cart-page">

            <div className="title-center">

                <h1 className="fancy-title">
                    My Cart
                </h1>

            </div>

            {loading ? (

                <h2 className="cart-message">
                    Loading...
                </h2>

            ) : cart.length === 0 ? (

                <h2 className="cart-message">
                    Cart is Empty 🛒
                </h2>

            ) : (

                <>
                    {/* Cart Items */}
                    <div className="cart-grid">

                        {cart.map((item) => (

                            <div
                                key={item._id}
                                className="cart-card"
                            >

                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDelete(
                                            item._id
                                        )
                                    }
                                >
                                    X
                                </button>

                                <img
                                    src={item.image}
                                    alt={item.productName}
                                    className="cart-img"
                                />

                                <h3 className="cart-name">
                                    {item.productName}
                                </h3>

                                <p className="cart-qty">
                                    Qty :
                                    {item.quantity}
                                </p>

                                <p className="cart-price">
                                    ₹ {item.total}
                                </p>

                            </div>

                        ))}

                    </div>

                    {/* Address Form */}
                    <div className="cart-form-box">

                        <h2>
                            Delivery Details
                        </h2>

                        <input
                            type="text"
                            name="address"
                            placeholder="Enter Full Address"
                            className="cart-input"
                            value={userData.address}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="phone"
                            placeholder="Enter Phone Number"
                            className="cart-input"
                            value={userData.phone}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Total */}
                    <div className="cart-total-box">

                        <h2 className="cart-total-text">
                            Total ₹ {total}
                        </h2>

                        <button
                            className="add-cart-btn1"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>

                    </div>
                </>
            )}

        </div>

    );
};

export default UserCart;