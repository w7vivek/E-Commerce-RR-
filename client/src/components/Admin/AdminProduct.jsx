import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../style/AdminProduct.css';

const AdminProduct = () => {

    const [productData, setProductData] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: ""
    });

    const [editId, setEditId] = useState(null);

    /* Fetch Products */
    const fetchProducts = async () => {

        try {

            const res = await axios.get(
                'http://localhost:5000/productDetails'
            );

            setProductData(res.data);

        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        fetchProducts();
    }, []);

    /* Input Change */
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    /* Add Product */
    const handleAddProduct = async () => {

        try {

            const data = {
                ...formData,
                image: `/images/${formData.image}`
            };

            await axios.post(
                'http://localhost:5000/addProduct',
                data
            );

            fetchProducts();

            resetForm();

        } catch (error) {
            console.log(error);
        }

    };

    /* Set Update Data */
    const handleEdit = (item) => {

        setEditId(item._id);

        setFormData({
            name: item.name,
            category: item.category,
            price: item.price,
            stock: item.stock,
            image: item.image.replace('/images/', '')
        });

    };

    /* Update Product */
    const handleUpdateProduct = async () => {

        try {

            const data = {
                ...formData,
                image: `/images/${formData.image}`
            };

            await axios.put(
                `http://localhost:5000/productData/${editId}`,
                data
            );

            fetchProducts();

            resetForm();

        } catch (error) {
            console.log(error);
        }

    };

    /* Reset Form */
    const resetForm = () => {

        setFormData({
            name: "",
            category: "",
            price: "",
            stock: "",
            image: ""
        });

        setEditId(null);

    };

    const handleDeleteData = (id) => {
        axios.delete(`http://localhost:5000/adminDeleteProduct/${id}`)
        setProductData((prev) =>
            prev.filter(
                (item) =>
                    (item._id || item.id) !== id
            )
        );
    }

    return (

        <div className="home-page">

            <div className="title-center">
                <h1 className="fancy-title">
                    Admin Products
                </h1>
            </div>

            {/* Add / Update Form */}
            <div className="add-product-box">

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image Name (pen.png)"
                    value={formData.image}
                    onChange={handleChange}
                />

                {editId ? (

                    <button
                        className="update-btn"
                        onClick={handleUpdateProduct}
                    >
                        Save Update
                    </button>

                ) : (

                    <button
                        className="update-btn"
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </button>

                )}

            </div>

            {/* Product Display */}
            <div className="product-grid">

                {productData.map((item) => (

                    <div
                        key={item._id}
                        className="product-card"
                    >
                        <button
                            type="button"
                            className="delete-btn"
                            onClick={() => handleDeleteData(item._id)}
                        >
                            X
                        </button>

                        <img
                            src={item.image}
                            alt={item.name}
                            className="product-image"
                        />

                        <h3>{item.name}</h3>

                        <p>₹ {item.price}</p>

                        <p>{item.category}</p>

                        <p>Stock : {item.stock}</p>

                        <button
                            className="update-btn"
                            onClick={() => handleEdit(item)}
                        >
                            Update
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default AdminProduct;