const mongoose = require("mongoose");

// Hard-coded MongoDB connection string (for simplicity)
const connectDB = async () => {
	try {
		const MONGO_URI = "mongodb://localhost:27017/ecommerce-chatbot";

		const conn = await mongoose.connect(MONGO_URI);

		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;
