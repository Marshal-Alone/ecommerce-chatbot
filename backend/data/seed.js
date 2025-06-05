const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");

// Hard-coded MongoDB connection string (for simplicity)
const MONGO_URI = "mongodb://localhost:27017/ecommerce-chatbot";

// Connect to MongoDB
mongoose
	.connect(MONGO_URI)
	.then(() => console.log("MongoDB connection successful for seeding"))
	.catch((err) => {
		console.error("MongoDB connection error:", err);
		process.exit(1);
	});

// Read the products data
const products = JSON.parse(fs.readFileSync(path.join(__dirname, "./products.json"), "utf-8"));

// Import data into database
const importData = async () => {
	try {
		// Clear existing products
		await Product.deleteMany({});
		console.log("Previous products deleted");

		// Add new products
		await Product.insertMany(products);
		console.log(`${products.length} products imported successfully`);

		process.exit();
	} catch (err) {
		console.error("Error importing data:", err);
		process.exit(1);
	}
};

// Run the import
importData();
