const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Test endpoint
router.get("/test", (req, res) => {
	res.json({ message: "API is working!" });
});

// Get all products with pagination
router.get("/products", async (req, res) => {
	try {
		// Pagination parameters
		const page = parseInt(req.query.page) || 1; // Current page (default: 1)
		const limit = parseInt(req.query.limit) || 10; // Items per page (default: 10)

		// Calculate skip value for pagination
		const skip = (page - 1) * limit;

		// Get total count of products
		const total = await Product.countDocuments({});

		// Fetch products with pagination
		const products = await Product.find({}).skip(skip).limit(limit);

		// Calculate total pages
		const totalPages = Math.ceil(total / limit);

		res.json({
			products,
			pagination: {
				total,
				totalPages,
				currentPage: page,
				itemsPerPage: limit,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Search products by query string
router.get("/products/search", async (req, res) => {
	try {
		const query = req.query.q ? req.query.q.toLowerCase() : "";

		if (!query) {
			return res.status(400).json({ message: "Search query is required" });
		}

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

// Get products by category
router.get("/products/category/:category", async (req, res) => {
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

		// Extract unique categories manually
		const categories = [...new Set(products.map((product) => product.category))];

		res.json(categories);
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
