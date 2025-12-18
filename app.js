const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// 1. Database Connection
mongoose.connect('mongodb+srv://kamili:root@cluster0.gbsihec.mongodb.net/?appName=Cluster0')
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log("Connection error:", err));

// 2. Middleware & View Engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // For CSS/Images
app.use(express.urlencoded({ extended: true })); // To parse form data

const Product = require('./models/product'); // Import the model

// PAGE 1: Welcome Page
app.get('/', (req, res) => {
    res.render('index');
});

// PAGE 2: Product List with Search & Filters
/*app.get('/products', async (req, res) => {
    const { search, category, brand, carModel } = req.query;
    
    // Build a dynamic query object
    let queryObject = {};

    if (search) {
        queryObject.name = { $regex: search, $options: 'i' }; // 'i' makes it case-insensitive
    }
    if (category) {
        queryObject.category = category;
    }
    if (brand) {
        queryObject.brand = brand;
    }
    if (carModel) {
        queryObject.carModel = carModel;
    }

    try {
        const products = await Product.find(queryObject);
        res.render('product-list', { products });
    } catch (err) {
        res.status(500).send("Error fetching products");
    }
});
*/
app.get('/products', async (req, res) => {
    const { search, category, brand, carModel, condition } = req.query;

    let queryObject = {};

    if (search) {
        queryObject.name = { $regex: search, $options: 'i' };
    }
    if (category) {
        queryObject.category = category;
    }
    if (brand) {
        queryObject.brand = brand;
    }
    if (carModel) {
        queryObject.carModel = carModel;
    }
    if (condition) {
        queryObject.condition= condition;
    }

    try {
        const products = await Product.find(queryObject);

        // Get unique values for selects
        const categories = await Product.distinct('category');
        const brands = await Product.distinct('brand');
        const carModels = await Product.distinct('carModel');
        const conditions = await Product.distinct('condition')

        res.render('product-list', {
            products,
            categories,
            brands,
            carModels,
            conditions,
            filters: { search, category, brand, carModel, condition }
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching products");
    }
});
app.get('/products/:id', async (req, res) => {
    try {
        // req.params.id captures the ID from the URL
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send("Product not found in our local database.");
        }

        // Render your detail page and pass the found product
        res.render('product-detail', { product });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// 4. Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});