import React from 'react';
import './Cart.css'; // Add your CSS for styling

const Notification = ({ message, type, onClose }) => {
    return (
        <div className={`notification ${type}`}>
            <span>{message}</span>
            <button onClick={onClose}>&times;</button>
        </div>
    );
};

export default Notification;
