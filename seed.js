const mongoose = require('mongoose');
const Product = require('./models/product');

const sampleProducts = [
    {
        name: "Brake Pads (Front)",
        brand: "Bosch",
        carModel: "Toyota Corolla",
        category: "Braking",
        price: 45.00,
        condition: "New",
        stock: 20,
        image: "/images/thumb.jpg"
    },
    {
        name: "Oil Filter",
        brand: "Mann-Filter",
        carModel: "Volkswagen Golf",
        category: "Engine",
        price: 12.50,
        condition: "New",
        stock: 50,
        image: "/images/thumb.jpg"
    },
    {
        name: "LED Headlight Bulb",
        brand: "Philips",
        carModel: "Universal",
        category: "Lighting",
        price: 85.00,
        condition: "New",
        stock: 15,
        image: "/images/thumb.jpg"
    },
    {
        name: "Alternator",
        brand: "Valeo",
        carModel: "Renault Clio",
        category: "Electrical",
        price: 120.00,
        condition: "Used",
        stock: 3,
        image: "/images/thumb.jpg"
    },
    {
        name: "Shock Absorber",
        brand: "Monroe",
        carModel: "Dacia Logan",
        category: "Suspension",
        price: 65.00,
        condition: "New",
        stock: 8,
        image: "/images/thumb.jpg"
    },
    {
        name: "Spark Plug Set (4pcs)",
        brand: "NGK",
        carModel: "Peugeot 208",
        category: "Engine",
        price: 32.00,
        condition: "New",
        stock: 100,
        image: "/images/thumb.jpg"
    }
];
mongoose.connect('mongodb+srv://kamili:root@cluster0.gbsihec.mongodb.net/?appName=Cluster0')
    .then(async () => {
        console.log("Connected to Atlas for Seeding...");
        await Product.deleteMany({}); // Clears the collection
        await Product.insertMany(sampleProducts);
        console.log("Data successfully seeded!");
        mongoose.connection.close();
    })
    .catch(err => console.log(err));