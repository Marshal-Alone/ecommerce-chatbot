const mongoose = require("mongoose");

/**
 *  Product Schema for e-commerce products
 */
const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		category: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			type: String,
			default: "default.jpg",
		},
		brand: {
			type: String,
			required: true,
			trim: true,
		},
		specifications: {
			type: Object,
			default: {},
		},
		stock: {
			type: Number,
			required: true,
			default: 0,
		},
		rating: {
			type: Number,
			default: 0,
		},
		features: {
			type: [String],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

// Create and export the model
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
