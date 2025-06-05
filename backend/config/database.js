const mongoose = require("mongoose");

// MongoDB connection URI (default to localhost if no env variable)
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce-chatbot";

// Connect to MongoDB
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(MONGO_URI);
		console.log("MongoDB Connected");

		// Set up event listeners for connection issues
		mongoose.connection.on("error", (err) => {
			console.error("MongoDB connection error:", err);
		});

		mongoose.connection.on("disconnected", () => {
			console.log("MongoDB disconnected");
		});

		mongoose.connection.on("reconnected", () => {
			console.log("MongoDB reconnected");
		});

		return conn;
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};

module.exports =  connectDB ;
