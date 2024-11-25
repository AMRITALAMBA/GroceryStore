
// import React, { useState } from 'react';
// import Signup from './Signup';
// import Login from './Login';
// import AdminLogin from './AdminLogin'; // Import the AdminLogin component
// import './HomePage.css'; // Import the CSS file

// const HomePage = () => {
//     const [currentComponent, setCurrentComponent] = useState(null); // State to track which component to show

//     const showSignup = () => {
//         setCurrentComponent(<Signup />); // Set the Signup component
//     };

//     const showLogin = () => {
//         setCurrentComponent(<Login />); // Set the Login component
//     };

//     const showAdminLogin = () => {
//         setCurrentComponent(<AdminLogin />); // Set the AdminLogin component
//     };

//     return (
//         <div className="homepage">
//             <div className="hero">
//                 <div className="hero-content">
//                     <h1>Welcome to BasketBuddy</h1>
//                     <p>Get the best deals on your favorite groceries!</p>
//                     <button 
//                         onClick={showSignup} 
//                         className="hero-button"
//                     >
//                         Signup
//                     </button>
//                     <button 
//                         onClick={showLogin} 
//                         className="hero-button"
//                     >
//                         Login
//                     </button>
//                     <button 
//                         onClick={showAdminLogin} 
//                         className="hero-button"
//                     >
//                         Admin Login
//                     </button>
//                 </div>
//             </div>

//             <div className="component-container">
//                 {currentComponent}  {/* Render the selected component here */}
//             </div>
//         </div>
//     );
// };

// export default HomePage;

import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import AdminLogin from './AdminLogin';
import Modal from './Modal';
import './HomePage.css';
import AdminSignup from './AdminSignup';

const HomePage = () => {
    const [currentComponent, setCurrentComponent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (component) => {
        setCurrentComponent(component);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="homepage">
            {/* Navbar */}
            <nav className="navbar">
                <h1 className="logo">BasketBuddy</h1>
                <div className="nav-links">
                    <button onClick={() => openModal(<Signup closeModal={closeModal} />)}>Signup</button>
                    <button onClick={() => openModal(<Login closeModal={closeModal} />)}>Login</button>
                    <button onClick={() => openModal(<AdminSignup closeModal={closeModal} />)}>Shop Connect</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Fresh Groceries Delivered to Your Doorstep</h1>
                    <p>Manage, shop, and organize your groceries with ease.</p>
                    <div className="cta-buttons">
                        <button
                            className="cta-button"
                            onClick={() => openModal(<Signup closeModal={closeModal} />)}
                        >
                            Get Started
                        </button>
                        <button
                            className="cta-button-alt"
                            onClick={() => openModal(<Login closeModal={closeModal} />)}
                        >
                            Login
                        </button>
                    </div>
                </div>
                <div className="hero-visual">
                    <img
                        src="https://dynl.mktgcdn.com/p/UrGakStROJSl71_7eXa98-4nQexHTveaYBJNtV9IfnM/1900x1267.jpg"
                        alt="App preview"
                        className="app-preview"
                    />
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Why You'll Love BasketBuddy</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                    <img width="100" height="100" src="https://img.icons8.com/plasticine/100/order-on-the-way.png" alt="order-on-the-way"/>
                        <h3>Smart Tracking</h3>
                        <p>Keep track of all your grocery items and never miss a thing.</p>
                    </div>
                    <div className="feature-card">
                        <img src="https://cdn-icons-png.flaticon.com/512/2331/2331976.png" alt="Save Money"/>
                        <h3>Save Money</h3>
                        <p>Exclusive offers and discounts tailored just for you.</p>
                    </div>
                    
                </div>
            </section>

            {/* Interactive Section */}
            <section className="interactive-section">
                <h2 className="section-title">See BasketBuddy in Action</h2>
                <div className="interactive-demo">
                    <div className="demo-box">
                        <h3>Plan Your Week</h3>
                        <p>Organize groceries for your weekly meals in just a few clicks.</p>
                    </div>
                    <div className="demo-box">
                        <h3>Track Spending</h3>
                        <p>Monitor your expenses and stick to your budget effortlessly.</p>
                    </div>
                    <div className="demo-box">
                        <h3>Real-Time Offers</h3>
                        <p>Receive notifications on fresh deals and discounts.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} BasketBuddy. Designed with care.</p>
            </footer>

            {/* Modal */}
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    {currentComponent}
                </Modal>
            )}
        </div>
    );
};

export default HomePage;
