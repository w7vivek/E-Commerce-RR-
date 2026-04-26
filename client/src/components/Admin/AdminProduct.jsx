import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../style/AdminProduct.css';

const AdminProduct = () => {

    const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: null   // null = no new file selected
    });

    // When editing, keep track of the existing image URL separately
    const [existingImageUrl, setExistingImageUrl] = useState("");
    const [editId, setEditId] = useState(null);

    /* Fetch Products */
    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${API}/productDetails`);
            setProductData(res.data);
        } catch (err) {
            setError("Failed to load products.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    /* Input Change */
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    /* Validation */
    const validate = () => {
        if (!formData.name.trim()) return "Product name is required.";
        if (!formData.category.trim()) return "Category is required.";
        if (!formData.price || Number(formData.price) <= 0) return "A valid price is required.";
        if (!formData.stock || Number(formData.stock) < 0) return "A valid stock count is required.";
        if (!editId && !formData.image) return "Please select an image.";
        return null;
    };

    /* Build FormData for both add and update */
    const buildFormData = () => {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("category", formData.category);
        data.append("price", formData.price);
        data.append("stock", formData.stock);

        if (formData.image) {
            // New file selected — upload it
            data.append("image", formData.image);
        } else if (existingImageUrl) {
            // No new file — pass the existing Cloudinary URL as a string
            data.append("existingImageUrl", existingImageUrl);
        }

        return data;
    };

    /* Add Product */
    const handleAddProduct = async () => {
        const validationError = validate();
        if (validationError) { setError(validationError); return; }
        setError("");
        setLoading(true);
        try {
            await axios.post(`${API}/addProduct`, buildFormData());
            await fetchProducts();
            resetForm();
        } catch (err) {
            setError("Failed to add product. Please try again.");
            console.error("Add product error:", error); 
        } finally {
            setLoading(false);
        }
    };

    /* Set Update Data */
    const handleEdit = (item) => {
        setEditId(item._id);
        setExistingImageUrl(item.image);  // store the real Cloudinary URL
        setFormData({
            name: item.name,
            category: item.category,
            price: item.price,
            stock: item.stock,
            image: null   // no new file yet
        });
        setError("");
    };

    /* Update Product */
    const handleUpdateProduct = async () => {
        const validationError = validate();
        if (validationError) { setError(validationError); return; }
        setError("");
        setLoading(true);
        try {
            await axios.put(`${API}/productData/${editId}`, buildFormData());
            await fetchProducts();
            resetForm();
        } catch (err) {
            setError("Failed to update product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    /* Reset Form */
    const resetForm = () => {
        setFormData({ name: "", category: "", price: "", stock: "", image: null });
        setExistingImageUrl("");
        setEditId(null);
        setError("");
    };

    /* Delete Product */
    const handleDeleteData = async (id) => {
        try {
            await axios.delete(`${API}/adminDeleteProduct/${id}`);
            setProductData(prev => prev.filter(item => (item._id || item.id) !== id));
        } catch (err) {
            setError("Failed to delete product.");
        }
    };

    return (
        <div className="home-page">

            <div className="title-center">
                <h1 className="fancy-title">Admin Products</h1>
            </div>

            {/* Add / Update Form */}
            <div className="add-product-box">

                {error && (
                    <p style={{ color: "red", fontSize: "14px", margin: "0 0 8px" }}>
                        {error}
                    </p>
                )}

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

                {/* Image upload — shows current image preview when editing */}
                {editId && existingImageUrl && !formData.image && (
                    <div style={{ marginBottom: "8px" }}>
                        <p style={{ fontSize: "12px", color: "#888", margin: "0 0 4px" }}>
                            Current image (upload a new one to replace it):
                        </p>
                        <img
                            src={existingImageUrl}
                            alt="Current product"
                            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }}
                        />
                    </div>
                )}

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                />

                <div style={{ display: "flex", gap: "8px" }}>
                    {editId ? (
                        <>
                            <button
                                className="update-btn"
                                onClick={handleUpdateProduct}
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Update"}
                            </button>
                            <button
                                className="update-btn"
                                onClick={resetForm}
                                disabled={loading}
                                style={{ background: "red" }}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            className="update-btn"
                            onClick={handleAddProduct}
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                    )}
                </div>

            </div>

            {/* Product Display */}
            <div className="product-grid">
                {productData.map((item) => (
                    <div key={item._id} className="product-card">

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