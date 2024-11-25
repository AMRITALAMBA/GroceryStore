import React, { createContext, useState, useEffect } from 'react';

const itemContext = createContext();

function CustomItemContext({ children }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [itemsInCart, setItemsInCart] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/products');
            const products = await response.json();
            setProducts(products);
        };

        fetchData();
    }, []);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex((item) => item._id === product._id);
    
            if (existingProductIndex !== -1) {
                const updatedCart = [...prevCart];
                const existingProduct = updatedCart[existingProductIndex];
                updatedCart[existingProductIndex] = {
                    ...existingProduct,
                    quantity: existingProduct.quantity ? existingProduct.quantity + 1 : 2,
                    price: existingProduct.price + product.price
                };
                return updatedCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    
        setTotalPrice((prevTotal) => prevTotal + product.price);
        setItemsInCart((prevCount) => prevCount + 1);
    };

    const removeFromCart = (product) => {
        setCart((prevCart) => {
            const index = prevCart.findIndex((item) => item._id === product._id);
    
            if (index !== -1) {
                const updatedCart = [...prevCart];
                const existingProduct = updatedCart[index];
    
                if (existingProduct.quantity > 1) {
                    // Subtract the price of one unit (not the total price)
                    const unitPrice = existingProduct.price / existingProduct.quantity;
                    
                    // Decrease quantity by 1 and subtract the unit price
                    updatedCart[index] = {
                        ...existingProduct,
                        quantity: existingProduct.quantity - 1,
                        price: existingProduct.price - unitPrice
                    };
                } else {
                    // Remove product from the cart if quantity is 1
                    updatedCart.splice(index, 1);
                }
    
                return updatedCart;
            }
            return prevCart;
        });
    
        // Subtract the price of one unit from the total price
        const unitPrice = product.price / product.quantity;
        setTotalPrice((prevTotal) => prevTotal - unitPrice);
    
        // Decrease the total number of items in the cart by 1
        setItemsInCart((prevCount) => prevCount - 1);
    };
    
    

    const clearCart = () => {
        setCart([]);
        setTotalPrice(0);
        setItemsInCart(0); // Optional: Reset itemsInCart if needed
    };

    return (
        <itemContext.Provider value={{ products, cart, addToCart, removeFromCart, clearCart, itemsInCart, totalPrice }}>
            {children}
        </itemContext.Provider>
    );
}

export { itemContext };
export default CustomItemContext;
