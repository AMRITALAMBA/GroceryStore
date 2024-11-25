import React, { useEffect, useState } from 'react';
import './OrderHistory.css';

const OrderHistory = ({ onClose }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                const response = await fetch('http://localhost:5000/api/orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const ordersData = await response.json();
                    setOrders(ordersData);
                } else {
                    console.error('Failed to fetch orders.');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    return (
        <div className="order-history-overlay">
            <div className="order-history-content">
                <button className="close-btn" onClick={onClose}>Close</button>
                <h2>Your Previous Orders</h2>
                {orders.length === 0 ? (
                    <p>You haven't placed any orders yet.</p>
                ) : (
                    <ul>
                        {orders.map((order) => (
                            <li key={order._id} className="order-item">
                                <h3>Order ID: {order._id}</h3>
                                <p>Total Price: {order.totalPrice} Rs</p>
                                <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                                <ul>
                                    {order.items.map((item) => (
                                        <li key={item.product?._id}>
                                            {/* Display item name and quantity */}
                                            {item.product?.name} - Quantity: {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;

