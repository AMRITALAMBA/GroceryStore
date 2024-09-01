// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const User = require('./models/userModel.js')
const jwt = require('jsonwebtoken')
mongoose.connect('mongodb://localhost/fruitvegmarke',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
);

app.use(express.json());
app.use(cors()); // Use the cors middleware

const productSchema = new mongoose.Schema({
name: String,
type: String,
description: String,
price: Number,
image: String,
});

const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number,
    }],
    totalPrice: Number,
}, {
    timestamps: true, // Optional: to track when orders are created/updated
});

module.exports = mongoose.model('Order', orderSchema);

const Order = mongoose.model('Order', orderSchema);


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, '2b352cea-da9c-4abb-95c1-26aa15540ccf', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};






// Define API endpoint for fetching all products
app.get('/api/products', async (req, res) => {
try {
    // Fetch all products from the database
    const allProducts = await Product.find();

    // Send the entire products array as JSON response
    res.json(allProducts);
} catch (error) {
    console.error(error);
    res.status(500)
    .json({ error: 'Internal Server Error' });
}
});

// Signup route
app.post('/api/users/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login route
app.post('/api/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(password);
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create and send token
        const token = jwt.sign({ userId: user._id },'2b352cea-da9c-4abb-95c1-26aa15540ccf', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/orders/order', authenticateToken, async (req, res) => {
    try {
        console.log(req.body);
        const { cart, totalPrice } = req.body;
        console.log(cart);
        const items = cart.map(item => ({
            product: item._id, // Assuming _id is the product identifier
            quantity: item.quantity, // Adjust according to your use case
            price: item.price
        }));
        const order = new Order({
            user: req.user.userId,
            items,
            totalPrice,
        });
        await order.save();
        res.status(201).json({ message: 'Order placed successfully!' });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Failed to place order. Please try again.' });
    }
});



app.listen(PORT, () => {
console.log(
    `Server is running on port ${PORT}`
);
});
