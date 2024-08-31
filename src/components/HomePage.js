import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
    const [currentComponent, setCurrentComponent] = useState(null); // State to track which component to show

    const showSignup = () => {
        setCurrentComponent(<Signup />); // Set the Signup component
    };

    const showLogin = () => {
        setCurrentComponent(<Login />); // Set the Login component
    };

    return (
        <div className="homepage">
            <div className="hero">
                <div className="hero-content">
                    <h1>Welcome to Grocery App</h1>
                    <p>Get the best deals on your favorite groceries!</p>
                    <button 
                        onClick={showSignup} 
                        className="hero-button"
                    >
                        Signup
                    </button>
                    <button 
                        onClick={showLogin} 
                        className="hero-button"
                    >
                        Login
                    </button>
                </div>
            </div>

            <div className="component-container">
                {currentComponent}  {/* Render the selected component here */}
            </div>
        </div>
    );
};

export default HomePage;



