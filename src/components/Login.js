// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './signuplogin.css';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [statusMessage, setStatusMessage] = useState(''); // State for status message
//     const [statusType, setStatusType] = useState(''); // State for success or error type
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
//             setStatusMessage('Login successful!');
//             setStatusType('success');
//             localStorage.setItem('token', response.data.token);
//             setTimeout(() => navigate('/view'), 1500); // Navigate after 1.5 seconds
//         } catch (error) {
//             console.error('There was an error!', error);
//             setStatusMessage('Login failed. Please check your credentials.');
//             setStatusType('error');
//         }
//     };

//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Username:</label>
//                     <input 
//                         type="text" 
//                         value={username} 
//                         onChange={(e) => setUsername(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Password:</label>
//                     <input 
//                         type="password" 
//                         value={password} 
//                         onChange={(e) => setPassword(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <button type="submit" className="btn">Login</button>
//             </form>
//             {statusMessage && (
//                 <div className={`status-message ${statusType}`}>
//                     {statusMessage}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './signuplogin.css';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [statusMessage, setStatusMessage] = useState(''); // State for status message
//     const [statusType, setStatusType] = useState(''); // State for success or error type
//     const [isRedirecting, setIsRedirecting] = useState(false); // State for redirect animation
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
//             setStatusMessage('Login successful!');
//             setStatusType('success');
//             localStorage.setItem('token', response.data.token);

//             // Show loading animation before redirecting
//             setIsRedirecting(true);
//             setTimeout(() => {
//                 navigate('/view');
//             }, 2000); // Redirect after 2 seconds
//         } catch (error) {
//             console.error('There was an error!', error);
//             setStatusMessage('Login failed. Please check your credentials.');
//             setStatusType('error');
//         }
//     };

//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Username:</label>
//                     <input 
//                         type="text" 
//                         value={username} 
//                         onChange={(e) => setUsername(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Password:</label>
//                     <input 
//                         type="password" 
//                         value={password} 
//                         onChange={(e) => setPassword(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <button type="submit" className="btn" disabled={isRedirecting}>
//                     {isRedirecting ? 'Redirecting...' : 'Login'}
//                 </button>
//             </form>
//             {statusMessage && (
//                 <div className={`status-message ${statusType}`}>
//                     {statusMessage}
//                 </div>
//             )}
//             {isRedirecting && (
//                 <div className="loading-overlay">
//                     <div className="spinner"></div>
//                     <p>Hold tight, superstar! 🌟 <br />Your fabulous grocery page on the way. 🍎✨ <br />Don't blink, or you'll miss the magic!</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signuplogin.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState(''); // State for status message
    const [statusType, setStatusType] = useState(''); // State for success or error type
    const [isRedirecting, setIsRedirecting] = useState(false); // State for redirect animation
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
            setStatusMessage('Login successful!');
            setStatusType('success');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username); // Store username in localStorage

            // Show loading animation before redirecting
            setIsRedirecting(true);
            setTimeout(() => {
                navigate('/view');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('There was an error!', error);
            setStatusMessage('Login failed. Please check your credentials.');
            setStatusType('error');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn" disabled={isRedirecting}>
                    {isRedirecting ? 'Redirecting...' : 'Login'}
                </button>
            </form>
            {statusMessage && (
                <div className={`status-message ${statusType}`}>
                    {statusMessage}
                </div>
            )}
            {isRedirecting && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>Hold tight, superstar! 🌟 <br />Your fabulous grocery page on the way. 🍎✨ <br />Don't blink, or you'll miss the magic!</p>
                </div>
            )}
        </div>
    );
};

export default Login;
