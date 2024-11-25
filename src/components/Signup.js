// // src/components/Signup.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const Signup = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:5000/api/users/signup', { username, password });
//             alert('Signup successful!');
//         } catch (error) {
//             console.error('There was an error!', error);
//             alert('Signup failed.');
//         }
//     };

//     return (
//         <div>
//             <h2>Signup</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Username:</label>
//                     <input 
//                         type="text" 
//                         value={username} 
//                         onChange={(e) => setUsername(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input 
//                         type="password" 
//                         value={password} 
//                         onChange={(e) => setPassword(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <button type="submit">Signup</button>
//             </form>
//         </div>
//     );
// };

// export default Signup;

// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import './signuplogin.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState(''); // State for status messages
    const [statusType, setStatusType] = useState(''); // State for success or error type

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/signup', { username, password });
            setStatusMessage('Signup successful! Welcome aboard!');
            setStatusType('success');
            setUsername(''); // Clear input fields
            setPassword('');
        } catch (error) {
            console.error('There was an error!', error);
            setStatusMessage('Signup failed. Please try again.');
            setStatusType('error');
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
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
                <button type="submit" className="btn">Signup</button>
            </form>
            {statusMessage && (
                <div className={`status-message ${statusType}`}>
                    {statusMessage}
                </div>
            )}
        </div>
    );
};

export default Signup;
