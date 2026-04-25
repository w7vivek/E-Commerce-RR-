import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../style/Product.css';

const UserProduct = () => {

    const [productDetails, setProductDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 10;

    /* Quantity State */
    const [qty, setQty] = useState({});

    /* Quantity Change */
    const handleQty = (id, value) => {

        setQty((prev) => ({
            ...prev,
            [id]: Number(value)
        }));

    };

    /* Fetch Products */
    const fetchData = async () => {

        try {

            setLoading(true);

            const res = await axios.get(
                'http://localhost:5000/productDetails'
            );

            if (Array.isArray(res.data)) {

                setProductDetails(res.data);

            } else {

                setProductDetails([]);

            }

            setTimeout(() => {
                setLoading(false);
            }, 1200);

        } catch (error) {

            console.log(
                "Error fetching products:",
                error
            );

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    /* Pagination */
    const lastIndex =
        currentPage * itemsPerPage;

    const firstIndex =
        lastIndex - itemsPerPage;

    const currentProducts =
        productDetails.slice(
            firstIndex,
            lastIndex
        );

    const totalPages =
        Math.ceil(
            productDetails.length /
            itemsPerPage
        );

    /* Add Cart */
    const addCart = async (product) => {

        try {

            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );

            const productId = product._id || product.id;

            const quantity = qty[productId] || 1;

            const item = {

                userEmail: user.email,

                productName: product.name,

                price: product.price,

                image: product.image,

                quantity: quantity,

                total:product.price * quantity
            };

            await axios.post('http://localhost:5000/addUserproduct',item );

            alert("Added To Cart");

            /* Reset Input */
            setQty((prev) => ({
                ...prev,
                [productId]: 1
            }));

        } catch (error) {

            console.log(
                "Cart Error:",
                error
            );

        }

    };

    return (

        <div className="home-page">

            <div className="title-center">

                <h1 className="fancy-title">
                    Products
                </h1>

            </div>

            {/* Loader */}
            {loading ? (

                <div className="product-grid">

                    {[...Array(6)].map(
                        (_, index) => (

                            <div
                                key={index}
                                className="product-card skeleton-card"
                            >

                                <div className="skeleton skeleton-image"></div>
                                <div className="skeleton skeleton-text"></div>
                                <div className="skeleton skeleton-text short"></div>
                                <div className="skeleton skeleton-text small"></div>

                            </div>

                        )
                    )}

                </div>

            ) : (

                <>

                    {/* Product Grid */}
                    <div className="product-grid">

                        {currentProducts.map((p) => {

                            const productId = p._id || p.id;

                            return (

                                <div
                                    key={productId}
                                    className="product-card"
                                >

                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="product-image"
                                    />

                                    <h3 className="product-name">
                                        {p.name}
                                    </h3>

                                    <p className="product-price">
                                        ₹ {p.price}
                                    </p>

                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={
                                            qty[productId] || 1
                                        }
                                        onChange={(e) =>
                                            handleQty(
                                                productId,
                                                e.target.value
                                            )
                                        }
                                        className="qty-input"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            addCart(p)
                                        }
                                        className="add-cart-btn"
                                    >
                                        AddCart
                                    </button>

                                </div>

                            );

                        })}

                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (

                        <div className="pagination">

                            {[...Array(totalPages)].map(
                                (_, index) => (

                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentPage(index + 1)
                                        }
                                        className={
                                            currentPage === index + 1
                                                ? "page-btn active"
                                                : "page-btn"
                                        }
                                    >
                                        {index + 1}
                                    </button>

                                )
                            )}

                        </div>

                    )}

                </>

            )}

        </div>

    );
};

export default UserProduct;