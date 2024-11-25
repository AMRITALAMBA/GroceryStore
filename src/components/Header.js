import React, { useContext, useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHistory, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { itemContext } from "../context/ItemContext";
import Cart from "./Cart";
import OrderHistory from "./OrderHistory";

import { useNavigate } from "react-router-dom";
const Header = () => {
  const { itemsInCart, totalPrice, user, logout } = useContext(itemContext);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isOrderHistoryVisible, setIsOrderHistoryVisible] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [username, setUsername] = useState(""); 
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
    setIsOrderHistoryVisible(false);
  };

  const toggleOrderHistory = () => {
    setIsOrderHistoryVisible(!isOrderHistoryVisible);
    setIsCartVisible(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuVisible(!isUserMenuVisible);
  };

  return (
    <header className="app-header">
      
      <div className="header-actions">
        <div className="cart-history">
          <div className="action-icon" onClick={toggleCart}>
            <FontAwesomeIcon icon={faCartShopping} size="2x" />
            <span className="action-label">Cart ({itemsInCart})</span>
          </div>
          <div className="action-icon" onClick={toggleOrderHistory}>
            <FontAwesomeIcon icon={faHistory} size="2x" />
            <span className="action-label">Orders</span>
          </div>
        </div>
        <div className="user-menu">
          <FontAwesomeIcon icon={faUserCircle} size="2x" onClick={toggleUserMenu} className="user-icon" />
          {isUserMenuVisible && (
            <div className="user-dropdown">
              <p className="username">{username}</p>
              <button className="logout-btn" onClick={() => { navigate("/"); }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {isCartVisible && <Cart onClose={toggleCart} />}
      {isOrderHistoryVisible && <OrderHistory onClose={toggleOrderHistory} />}
    </header>
  );
};

export default Header;


