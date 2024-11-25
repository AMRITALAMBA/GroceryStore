// src/components/AdminPage.js
import React, { useState } from 'react';
import './Admin.css'
const AdminPage = () => {
    const [product, setProduct] = useState({
        name: '',
        type: '',
        description: '',
        price: '',
        image: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                alert('Product added successfully!');
                setProduct({ name: '', type: '', description: '', price: '', image: '' }); // Reset form
            } else {
                setError('Failed to add product. Please try again.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="admin-page">
            <h2>Add New Product</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={product.name} onChange={handleChange} required />
                </label>
                <label>
                    Type:
                    <input type="text" name="type" value={product.type} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={product.description} onChange={handleChange} />
                </label>
                <label>
                    Price (Rs):
                    <input type="number" name="price" value={product.price} onChange={handleChange} required />
                </label>
                <label>
                    Image URL:
                    <input type="text" name="image" value={product.image} onChange={handleChange} />
                </label>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AdminPage;

