// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ children, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Close button inside modal */}
                <button className="modal-close" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;


