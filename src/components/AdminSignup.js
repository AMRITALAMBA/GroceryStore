import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './signuplogin.css'; // Ensure the CSS file is correctly styled

const AdminSignup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/admin/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Navigate to Admin Login page on successful signup
                navigate('/admin/login');
            } else {
                // Handle server error message
                const data = await response.json();
                setError(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="admin-signup">
            <h2>Happy To Connect 👩🏼‍🌾</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-signup">Signup</button>
            </form>
            <p className="switch-message">
                Already have an account?{' '}
                <Link to="/admin/login" className="login-link">
                    Login here
                </Link>
            </p>
        </div>
    );
};

export default AdminSignup;
