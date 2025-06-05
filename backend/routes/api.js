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
		// Simple sorting by name or price
		const sortBy = req.query.sort === "price" ? "price" : "name";
		const sortOrder = req.query.order === "desc" ? -1 : 1;

		// Get products with basic sorting
		const products = await Product.find({}).sort({ [sortBy]: sortOrder });
		res.json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Basic search with optional filters
router.get("/products/search", async (req, res) => {
	try {
		// Search parameters
		const searchQuery = req.query.q ? req.query.q.toLowerCase() : "";
		const category = req.query.category;

		const allProducts = await Product.find({});

		// Apply simple filters
		const filteredProducts = allProducts.filter((product) => {
			// Text search
			const matchesSearch =
				!searchQuery ||
				product.name.toLowerCase().includes(searchQuery) ||
				product.description.toLowerCase().includes(searchQuery) ||
				product.brand.toLowerCase().includes(searchQuery) ||
				product.category.toLowerCase().includes(searchQuery);

			// Optional category filter
			const matchesCategory =
				!category || product.category.toLowerCase() === category.toLowerCase();

			return matchesSearch && matchesCategory;
		});

		res.json(filteredProducts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get products by category
router.get("/products/category/:category", async (req, res) => {
	try {
		const category = req.params.category.toLowerCase();
		const allProducts = await Product.find({});

		// Filter products by category
		const filteredProducts = allProducts.filter(
			(product) => product.category.toLowerCase() === category
		);

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

// Get all categories
router.get("/categories", async (req, res) => {
	try {
		const products = await Product.find({});

		// Extract unique categories
		const categories = [...new Set(products.map((product) => product.category))];

		res.json(categories);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get all brands with product count
router.get("/brands", async (req, res) => {
	try {
		const products = await Product.find({});

		// Create a map of brands and their count
		const brandMap = {};
		products.forEach((product) => {
			const brand = product.brand;
			if (brandMap[brand]) {
				brandMap[brand]++;
			} else {
				brandMap[brand] = 1;
			}
		});

		// Convert map to array of brand objects
		const brands = Object.keys(brandMap).map((brand) => ({
			name: brand,
			count: brandMap[brand],
		}));

		// Sort brands alphabetically
		brands.sort((a, b) => a.name.localeCompare(b.name));

		res.json(brands);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get price range (min and max)
router.get("/price-range", async (req, res) => {
	try {
		const products = await Product.find({});

		if (products.length === 0) {
			return res.json({ min: 0, max: 0 });
		}

		let minPrice = Number.MAX_SAFE_INTEGER;
		let maxPrice = 0;

		products.forEach((product) => {
			if (product.price < minPrice) minPrice = product.price;
			if (product.price > maxPrice) maxPrice = product.price;
		});

		res.json({ min: minPrice, max: maxPrice });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Chatbot interaction endpoint
router.post("/chat", (req, res) => {
	const { message } = req.body;

	if (!message) {
		return res.status(400).json({ message: "Message is required" });
	}

	// Simple response logic
	let response = "I'm your shopping assistant. How can I help you today?";

	const lowerMessage = message.toLowerCase();

	if (lowerMessage.includes("hello") || lowerMessage.includes("hi ")) {
		response = "Hello! How can I help you with shopping today?";
	} else if (lowerMessage.includes("product") || lowerMessage.includes("item")) {
		response =
			"We have many great products. You can browse our categories or search for specific items.";
	} else if (lowerMessage.includes("category") || lowerMessage.includes("categories")) {
		response = "We have smartphones, laptops, tablets, audio devices, TVs, and gaming products.";
	} else if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
		response =
			"Our products are available at competitive prices. What specific item are you interested in?";
	} else if (lowerMessage.includes("help")) {
		response =
			"I can help you find products, check prices, or learn about our categories. What would you like to know?";
	} else if (lowerMessage.includes("thank")) {
		response = "You're welcome! Is there anything else you'd like help with?";
	}

	res.json({ message: response });
});

module.exports = router;
