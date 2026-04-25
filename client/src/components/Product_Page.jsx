import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../style/Product.css';

const Product_Page = () => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const [productDetails, setProductDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 10;

    /* Fetch Products */
    const fetchData = async () => {
        try {
            setLoading(true);

            const res = await axios.get(`${API}/productDetails`);

            if (Array.isArray(res.data)) {
                setProductDetails(res.data);
            } else {
                setProductDetails([]);
            }

            setTimeout(() => {
                setLoading(false);
            }, 1200);

        } catch (error) {
            console.log("Error fetching products:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    /* Pagination */
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const currentProducts = productDetails.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(productDetails.length / itemsPerPage);

    return (
        <div className="home-page">

            <div className="title-center">
                <h1 className="fancy-title">Products</h1>
            </div>

            {/* Skeleton Loader */}
            {loading ? (

                <div className="product-grid">

                    {[...Array(6)].map((_, index) => (

                        <div key={index} className="product-card skeleton-card">

                            <div className="skeleton skeleton-image"></div>
                            <div className="skeleton skeleton-text"></div>
                            <div className="skeleton skeleton-text short"></div>
                            <div className="skeleton skeleton-text small"></div>

                        </div>

                    ))}

                </div>

            ) : (

                <>
                    {/* Product Grid */}
                    <div className="product-grid">

                        {currentProducts.map((p) => (

                            <div key={p._id || p.id} className="product-card">

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

                                <p className="product-category">
                                    {p.category}
                                </p>

                            </div>

                        ))}

                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (

                        <div className="pagination">

                            {[...Array(totalPages)].map((_, index) => (

                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={
                                        currentPage === index + 1
                                            ? "page-btn active"
                                            : "page-btn"
                                    }
                                >
                                    {index + 1}
                                </button>

                            ))}

                        </div>

                    )}

                </>

            )}

        </div>
    );
};

export default Product_Page;