// // src/components/AdminLogin.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5000/api/admin/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//             });
//             const data = await response.json();

//             if (response.ok) {
//                 // Navigate to AdminPage on successful login
//                 navigate('/admin/page');
//             } else {
//                 alert('Access Denied!!');
//             }
//         } catch (error) {
//             setError('An error occurred. Please try again.');
//         }
//     };

//     return (
//         <div className="admin-login">
//             <h2>Admin Login</h2>
//             {error && <p className="error">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Username:
//                     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
//                 </label>
//                 <label>
//                     Password:
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 </label>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default AdminLogin;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signuplogin.css'; // Add a custom CSS file for better styling

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            

            if (response.ok) {
                // Navigate to AdminPage on successful login
                navigate('/admin/page');
            } else {
                setError('Access Denied! Invalid username or password.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="admin-login">
           <h2>Welcome Back! 🤗</h2>
            <p className="welcome-message">
                We're happy to have you as part of our community. Please log in to manage your admin dashboard and keep our platform thriving.
            </p>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="login-form">
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
                <button type="submit" className="btn-login">Login</button>
            </form>
            
        </div>
    );
};

export default AdminLogin;
