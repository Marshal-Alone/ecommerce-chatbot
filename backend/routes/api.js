const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Test endpoint
router.get("/test", (req, res) => {
	res.json({ message: "API is working!" });
});

// Get all products
router.get("/products", async (req, res) => {
	try {
		const products = await Product.find({});
		res.json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Search products by query string (simplified)
router.get("/products/search/:query", async (req, res) => {
	try {
		const query = req.params.query.toLowerCase();
		const allProducts = await Product.find({});

		// Filter products manually instead of using regex
		const filteredProducts = allProducts.filter((product) => {
			return (
				product.name.toLowerCase().includes(query) ||
				product.description.toLowerCase().includes(query) ||
				product.category.toLowerCase().includes(query) ||
				product.brand.toLowerCase().includes(query)
			);
		});

		res.json(filteredProducts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get product by ID
router.get("/products/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get products by category (simplified)
router.get("/categories/:category", async (req, res) => {
	try {
		const category = req.params.category.toLowerCase();
		const allProducts = await Product.find({});

		// Filter products manually by category
		const filteredProducts = allProducts.filter(
			(product) => product.category.toLowerCase() === category
		);

		res.json(filteredProducts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get all categories (simplified)
router.get("/categories", async (req, res) => {
	try {
		const products = await Product.find({});

		// Extract unique categories manually
		const categories = [...new Set(products.map((product) => product.category))];

		res.json(categories);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Simple mock API endpoint for chatbot communication
router.post("/chat", (req, res) => {
	const { message } = req.body;

	// Simple response logic
	let response = "I'm your shopping assistant. How can I help you today?";

	const lowerMessage = message.toLowerCase();

	if (lowerMessage.includes("hello") || lowerMessage.includes("hi ")) {
		response = "Hello! How can I help you with shopping today?";
	} else if (lowerMessage.includes("product") || lowerMessage.includes("item")) {
		response =
			"We have many great products. You can browse our categories or search for specific items.";
	} else if (lowerMessage.includes("category") || lowerMessage.includes("categories")) {
		response =
			"We have smartphones, laptops, tablets, cameras, audio devices, TVs, and gaming products.";
	} else if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
		response =
			"Our products are available at competitive prices. What specific item are you interested in?";
	}

	res.json({ message: response });
});

module.exports = router;
