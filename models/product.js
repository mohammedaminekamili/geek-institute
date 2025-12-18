const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,           // e.g., "Brake Pads"
    brand: String,          // e.g., "Bosch"
    carModel: String,       // e.g., "Toyota Corolla"
    category: String,       // e.g., "Braking", "Engine", "Lighting"
    price: Number,
    condition: String,      // "New" or "Used"
    stock: Number,
    image: String
});

module.exports = mongoose.model('Product', productSchema);