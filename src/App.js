import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';
import CustomItemContext from './context/ItemContext';
import HomePage from './components/HomePage';

const App = () => {
    return (
        <Router>
            <CustomItemContext>
                
                <Routes>
                <Route path="/" element={<HomePage />} />
                    <Route path="/view" element={<ProductList />} />
                    
                </Routes>
            </CustomItemContext>
        </Router>
    );
};

export default App;

