import React, { useContext, useState } from 'react';
import { itemContext } from '../context/ItemContext';
import Notification from './Notification';
import './Cart.css';

const Cart = ({ onClose }) => {
    const { cart, removeFromCart, addToCart, totalPrice, clearCart } = useContext(itemContext);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleRemove = (product) => {
        removeFromCart(product);
    };

    const handleIncreaseQuantity = (product) => {
        addToCart(product);
    };

    const handleOrder = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/api/orders/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    cart: cart.map((item) => ({
                        product: item._id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    totalPrice,
                }),
            });

            if (response.ok) {
                setNotification({ message: 'Order placed successfully!', type: 'success' });
                clearCart();
            } else {
                setNotification({ message: 'Failed to place the order. Please try again.', type: 'error' });
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setNotification({ message: 'An error occurred while placing the order.', type: 'error' });
        }
    };

    const closeNotification = () => setNotification({ message: '', type: '' });

    return (
        <div className="cart-overlay">
            <div className="cart-content">
                <button className="close-btn" onClick={onClose}>Close</button>
                <h2>Shopping Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cart.map((item) => (
                            <li key={item._id} className="cart-item">
                                <img
                                    src={item.image || '/path/to/default-image.jpg'}
                                    alt={item.name}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <span>{item.name} - {item.price} Rs/Kg </span>
                                    <button className="remove-btn" onClick={() => handleRemove(item)}>-</button>
                                    <span>(Quantity: {item.quantity || 1})</span>
                                    <button className="increase-btn" onClick={() => handleIncreaseQuantity(item)}>+</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <h3>Total Price: {totalPrice}</h3>
                {cart.length > 0 && (
                    <button className="order-btn" onClick={handleOrder}>Place Order</button>
                )}
            </div>

            {notification.message && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={closeNotification}
                />
            )}
        </div>
    );
};

export default Cart;
